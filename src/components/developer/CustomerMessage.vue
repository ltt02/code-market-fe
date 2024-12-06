<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Left Sidebar -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <!-- Search -->
        <div class="p-4 border-b border-gray-200">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" />
            <InputText v-model="searchQuery" placeholder="Search in Messenger" class="w-full" />
          </span>
        </div>
  
        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
          <Button 
            label="Inbox" 
            :class="['flex-1 !border-0 !rounded-none', activeTab === 'inbox' ? 'text-blue-500 border-b-2 !border-blue-500' : '']"
            @click="activeTab = 'inbox'"
          />
          <Button 
            label="Communities" 
            :class="['flex-1 !border-0 !rounded-none', activeTab === 'communities' ? 'text-blue-500 border-b-2 !border-blue-500' : '']"
            @click="activeTab = 'communities'"
          />
        </div>
  
        <!-- Conversations List -->
        <div class="flex-1 overflow-y-auto">
          <div 
            v-for="chat in filteredChats" 
            :key="chat.id"
            class="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-blue-50': chat.id === selectedChat?.id }"
            @click="selectChat(chat)"
          >
            <Avatar :image="chat.avatar" size="large" shape="circle" />
            <div class="ml-3 flex-1">
              <div class="flex justify-between">
                <span class="font-semibold">{{ chat.name }}</span>
                <span class="text-xs text-gray-500">{{ chat.lastMessageTime }}</span>
              </div>
              <div class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Chat Area -->
      <div class="flex-1 flex flex-col">
        <!-- Chat Header -->
        <div class="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div class="flex items-center">
            <Avatar :image="selectedChat?.avatar" size="normal" shape="circle" />
            <div class="ml-3">
              <div class="font-semibold">{{ selectedChat?.name }}</div>
              <div class="text-xs text-gray-500">Active now</div>
            </div>
          </div>
          <div class="flex gap-2">
            <Button icon="pi pi-phone" rounded outlined />
            <Button icon="pi pi-video" rounded outlined />
            <Button icon="pi pi-info-circle" rounded outlined />
          </div>
        </div>
  
        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-4 bg-white" ref="messagesContainer">
          <div v-for="message in selectedChat?.messages" :key="message.id" class="mb-4">
            <div :class="['flex', message.isSelf ? 'justify-end' : 'justify-start']">
              <div class="flex items-end gap-2">
                <Avatar 
                  v-if="!message.isSelf" 
                  :image="selectedChat?.avatar" 
                  size="normal" 
                  shape="circle"
                />
                <div 
                  :class="[
                    'max-w-[70%] rounded-2xl p-3',
                    message.isSelf ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  ]"
                >
                  {{ message.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Input Area -->
        <div class="border-t border-gray-200 p-4 bg-white">
          <div class="flex items-center gap-2">
            <Button icon="pi pi-plus" rounded text />
            <InputText 
              v-model="newMessage" 
              placeholder="Aa" 
              class="flex-1"
              @keyup.enter="sendMessage"
            />
            <Button icon="pi pi-thumbs-up" rounded text />
            <Button icon="pi pi-send" rounded text @click="sendMessage" label="Send"/>
          </div>
        </div>
      </div>
  
      <!-- Right Sidebar -->
      <!-- <div class="w-80 bg-white border-l border-gray-200">
        <div class="p-4">
          <div class="text-center">
            <Avatar :image="selectedChat?.avatar" size="xlarge" shape="circle" />
            <h2 class="mt-2 font-semibold text-xl">{{ selectedChat?.name }}</h2>
            <p class="text-sm text-gray-500">Active now</p>
          </div>
          
          <div class="mt-6">
            <h3 class="font-semibold mb-2">Chat Settings</h3>
            <div class="flex flex-col gap-2">
              <Button label="Search in Conversation" icon="pi pi-search" text class="justify-start" />
              <Button label="Change Theme" icon="pi pi-palette" text class="justify-start" />
              <Button label="Notifications" icon="pi pi-bell" text class="justify-start" />
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { ref, computed, nextTick } from 'vue'
  
import InputText from 'primevue/inputtext';

import Button from 'primevue/button';

import Avatar from 'primevue/avatar';

  const searchQuery = ref('')
  const activeTab = ref('inbox')
  const selectedChat = ref(null)
  const newMessage = ref('')
  const messagesContainer = ref(null)
  
  // Sample data
  const chats = ref([
    {
      id: 1,
      name: 'John Doe',
      avatar: '/placeholder.svg?height=50&width=50',
      lastMessage: 'Hey, how are you?',
      lastMessageTime: '5m',
      messages: [
        { id: 1, content: 'Hey, how are you?', isSelf: false },
        { id: 2, content: 'I\'m good, thanks! How about you?', isSelf: true },
        { id: 3, content: 'Pretty good! Want to grab coffee?', isSelf: false }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=50&width=50',
      lastMessage: 'See you tomorrow!',
      lastMessageTime: '1h',
      messages: [
        { id: 1, content: 'Are we still on for tomorrow?', isSelf: false },
        { id: 2, content: 'Yes, definitely!', isSelf: true },
        { id: 3, content: 'See you tomorrow!', isSelf: false }
      ]
    }
  ])
  
  const filteredChats = computed(() => {
    return chats.value.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const selectChat = (chat) => {
    selectedChat.value = chat
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
  
  const sendMessage = () => {
    if (!newMessage.value.trim() || !selectedChat.value) return
  
    const message = {
      id: Date.now(),
      content: newMessage.value,
      isSelf: true
    }
  
    selectedChat.value.messages.push(message)
    selectedChat.value.lastMessage = newMessage.value
    selectedChat.value.lastMessageTime = 'now'
    newMessage.value = ''
  
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
  
  // Select first chat by default
  if (chats.value.length > 0) {
    selectChat(chats.value[0])
  }
  </script>
  
  <style scoped>
  :deep(.p-inputtext) {
    padding: 0.5rem 1rem;
  }
  
  :deep(.p-avatar) {
    background-color: #f3f4f6;
  }
  
  :deep(.p-button) {
    padding: 0.5rem;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  </style>
  
  