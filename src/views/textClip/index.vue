<template>
    <div class="text-clip p-3">
        <div
            v-if="showMenu"
            class="content d-flex flex-wrap gap-3 row-gap-2"
        >
            <div
                v-for="menu in menus"
                :key="menu.name"
                class="menu p-2 shadow-sm"
                @click="handleClick(menu.name)"
            >
                <div class="menu-header title">
                    {{ menu.label }}
                </div>
                <div class="menu-body">
                    ...
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const menus = [
    {
        label: '语音播报',
        name: 'TextVoice'
    }
]

const route = useRoute()
const router = useRouter()
const showMenu = computed(() => route.name === 'TextClip')

function handleClick(name) {
    router.push({ name })
}
</script>

<style lang="scss" scoped>
.text-clip {
    .menu {
        min-width: 160px;
        width: 160px;
        border-radius: 8px;
        border: 1px solid transparent;
        cursor: pointer;

        &:hover {
            border-color: pink;
        }
    }
}
</style>
