<template>
    <div class="message" :class="{ 'message-self': isSelfMessage }">
        <div class="message-header">
            <span class="username">{{ message.userName }}</span>
            <span class="timestamp">{{ formatDateTime(message.dateTime) }}</span>
        </div>
        <div class="message-text">{{ message.text }}</div>
    </div>
</template>

<script>
export default {
    name: 'MessageComponent',
    props: {
        message: {
            type: Object,
            required: true
        },
        currentUserName: {
            type: String,
            required: true
        }
    },
    computed: {
        isSelfMessage() {
            return this.message.userName === this.currentUserName;
        }
    },
    methods: {
        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    }
}
</script>

<style scoped>
.message {
    margin-bottom: 10px;
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    max-width: 80%;
    margin-left: 0;
}

.message-self {
    background-color: #DCF8C6;
    margin-left: auto;
    margin-right: 0;
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 0.9rem;
}

.username {
    font-weight: bold;
    color: var(--background-color);
}

.message-self .username {
    color: #075E54;
}

.timestamp {
    color: #666;
    font-size: 0.8rem;
}

.message-text {
    word-break: break-word;
    color: #333;
}
</style>