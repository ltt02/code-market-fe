<template>
    <div class="bg-white rounded-lg">
        <h3 class="text-xl font-semibold mb-4 comment-title-text">Bình luận ({{ comments.length }})</h3>
        <div class="mb-8">
            <textarea v-model="newComment" placeholder="Thêm bình luận..."
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                rows="3"></textarea>
            <button @click="submitComment"
                class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Đăng tải
            </button>
        </div>
        <div class="space-y-4">
            <div v-for="comment in comments" :key="comment.id" class="flex space-x-3">
                <img :src="comment.avatar" :alt="`${comment.author}'s avatar`" class="w-10 h-10 rounded-full" />
                <div class="flex-1">
                    <div class="flex items-center space-x-2">
                        <h3 class="font-semibold">{{ comment.author }}</h3>
                        <span class="text-sm text-gray-500">{{ comment.date }}</span>
                    </div>
                    <p class="mt-1 text-justify">{{ comment.content }}</p>
                    <div class="mt-2 flex items-center space-x-2">
                        <button @click="likeComment(comment)"
                            class="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                            {{ comment.likes > 0 ? `${comment.likes} lượt thích` : 'Lượt thích' }}
                        </button>
                        <button class="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                            Phản hồi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Comment {
    id: number
    author: string
    avatar: string
    date: string
    content: string
    likes: number
}

const initialComments: Comment[] = [
    {
        id: 1,
        author: 'Tài',
        avatar: 'https://cdn.tgdd.vn/Files/2021/04/22/1345410/nguon-goc-dac-diem-cach-nuoi-bang-gia-cua-meo-ragdoll-202104221337515979.jpg',
        date: '2024/10/15',
        content: 'ABC',
        likes: 1
    },
    {
        id: 2,
        author: 'Tân',
        avatar: 'https://bizweb.dktcdn.net/100/303/962/files/87126502-2509242206005371-2073523065622364160-n-f697e400-e8b2-4bb1-9698-d00b50b2d9c3.jpg?v=1627804121650',
        date: '2024/10/14',
        content: 'Tuyệt',
        likes: 1
    },
    {
        id: 3,
        author: 'Nhung',
        avatar: 'https://traicho.com/wp-content/uploads/2024/07/cat-anh-long-ngan-1-3.jpg',
        date: '2024/10/13',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        likes: 0
    }
]

const comments = ref<Comment[]>(initialComments)
const newComment = ref('')

const submitComment = () => {
    if (newComment.value.trim()) {
        const comment: Comment = {
            id: comments.value.length + 1,
            author: 'Khách',
            avatar: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
            date: new Date().toLocaleDateString("ja-JP"),
            content: newComment.value.trim(),
            likes: 0
        }
        comments.value.unshift(comment)
        newComment.value = ''
    }
}

const likeComment = (comment: Comment) => {
    comment.likes++
}
</script>

<style>
.comment-title-text {
    margin: 0;
    padding: 0;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 125%;
    font-size: 1.25rem;
    margin-bottom: 10px;
}
</style>