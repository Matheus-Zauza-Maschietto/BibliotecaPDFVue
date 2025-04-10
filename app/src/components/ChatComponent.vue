<template>
    <div class="chat-container">
        <div class="chat-header" @click="toggleChat">
            <h3 class="fs-4">Chat Global</h3>
            <span class="toggle-icon fs-5">{{ isOpen ? '▼' : '▲' }}</span>
        </div>
        <div class="chat-body" v-show="isOpen">
            <div class="messages-container" ref="messagesContainer">
                <MessageComponent
                    v-for="(message, index) in messages"
                    :key="index"
                    :message="message"
                    :currentUserName="currentUserName"
                />
            </div>
            <div class="input-container">
                <input 
                    type="text" 
                    v-model="newMessage" 
                    @keyup.enter="sendMessage"
                    placeholder="Digite sua mensagem..."
                    class="form-control"
                >
                <button @click="sendMessage" class="btn btn-primary fs-5" :disabled="!newMessage.trim()">
                    Enviar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import * as signalR from '@microsoft/signalr';
import MessageComponent from './MessageComponent.vue';

export default {
    name: 'ChatComponent',
    components: {
        MessageComponent
    },
    data() {
        return {
            connection: null,
            messages: [],
            newMessage: '',
            isOpen: true,
            page: 1,
            hubUrl: 'http://localhost:5090/chathub',
            isLoadingMore: false,
            hasMoreMessages: true
        }
    },
    computed: {
        currentUserName() {
            return this.$store.state.self.name;
        }
    },
    methods: {
        async initializeConnection() {
            try {
                this.connection = await this.createHubConnection();
                this.registerMessageHandler();
                await this.startConnection();
                await this.requestInitialMessagesLoad();
                this.setupScrollListener();
            } catch (error) {
                this.handleConnectionError(error);
            }
        },

        createHubConnection() {
            return new signalR.HubConnectionBuilder()
                .withUrl(this.hubUrl, {
                    accessTokenFactory: () => this.$store.state.token
                })
                .withAutomaticReconnect()
                .build();
        },

        registerMessageHandler() {
            this.connection.on('ReceiveMessage', this.handleNewMessage);
            this.connection.on('ReceiveMessages', this.handleNewMessages);
        },

        async startConnection() {
            await this.connection.start();
        },

        handleNewMessage(message) {
            this.messages.push(message);
            this.scrollToBottom();
        },

        handleNewMessages(messages) {
            if (messages.length === 0) {
                this.hasMoreMessages = false;
                return;
            }
            
            this.messages = [...messages.reverse(), ...this.messages];
            
            if (!this.isLoadingMore) {
                this.scrollToBottom();
            }
        },

        async requestInitialMessagesLoad() {
            try {
                await this.connection.invoke('GetLastMessages', this.page);
            } catch (error) {
                this.handleMessageLoadError(error);
            }
        },

        updateMessageList(messages) {
            this.messages = messages
                .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                .reverse();
        },

        async sendMessage() {
            if (!this.isValidMessage()) return;

            try {
                const messageDto = this.createMessageDto();
                await this.connection.invoke('SendMessage', messageDto);
                this.newMessage = '';
            } catch (error) {
                this.handleSendMessageError(error);
            }
        },

        isValidMessage() {
            return this.newMessage.trim().length > 0;
        },

        createMessageDto() {
            return {
                text: this.newMessage,
                dateTime: new Date().toISOString()
            };
        },

        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messagesContainer;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            });
        },

        toggleChat() {
            this.isOpen = !this.isOpen;
        },

        handleConnectionError(error) {
            console.error('Erro ao conectar ao chat:', error);
        },

        handleMessageLoadError(error) {
            console.error('Erro ao carregar mensagens:', error);
        },

        handleSendMessageError(error) {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        },

        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        },

        setupScrollListener() {
            const container = this.$refs.messagesContainer;
            if (container) {
                container.addEventListener('scroll', this.handleScroll);
            }
        },

        async handleScroll() {
            const container = this.$refs.messagesContainer;
            if (!container || this.isLoadingMore || !this.hasMoreMessages) return;

            if (container.scrollTop <= 100) {
                await this.loadMoreMessages();
            }
        },

        async loadMoreMessages() {
            if (this.isLoadingMore) return;

            try {
                this.isLoadingMore = true;
                this.page += 1;
                const previousScrollHeight = this.$refs.messagesContainer.scrollHeight;
                
                await this.connection.invoke('GetLastMessages', this.page);
                
                // Mantém a posição da scroll após carregar novas mensagens
                this.$nextTick(() => {
                    const newScrollHeight = this.$refs.messagesContainer.scrollHeight;
                    this.$refs.messagesContainer.scrollTop = newScrollHeight - previousScrollHeight;
                });
            } catch (error) {
                console.error('Erro ao carregar mais mensagens:', error);
                this.page -= 1;
            } finally {
                this.isLoadingMore = false;
            }
        }
    },
    async created() {
        await this.initializeConnection();
    },
    beforeUnmount() {
        if (this.connection) {
            this.connection.stop();
        }
        const container = this.$refs.messagesContainer;
        if (container) {
            container.removeEventListener('scroll', this.handleScroll);
        }
    }
}
</script>

<style scoped>
.chat-container {
    position: fixed;
    bottom: 0;
    left: 20px;
    width: 500px;
    background-color: white;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    z-index: 1000;
}

.chat-header {
    padding: 10px;
    background-color: var(--background-color);
    color: white;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-header h3 {
    margin: 0;
    font-size: 1.1rem;
}

.chat-body {
    height: 600px;
    display: flex;
    flex-direction: column;
}

.messages-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    background-color: #f8f9fa;
}

.input-container {
    display: flex;
    padding: 10px;
    gap: 8px;
    background-color: #fff;
    border-top: 1px solid #dee2e6;
}

.input-container input {
    flex-grow: 1;
}

.toggle-icon {
    font-size: 12px;
}
</style>