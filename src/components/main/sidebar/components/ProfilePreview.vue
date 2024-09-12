<script setup lang="ts">
import { useUserStore, useAccessStore } from '@stores'
import Image from '@views/other/image/Main.vue'
import { $img } from '@/assets/composables'

const $user = useUserStore()
</script>

<template>
    <div id="profile_preview" :to="{ name: 'profile', params: { id: 3 } }" :title="$user.username">
        <div data-img>
            <Image :src="$img(String($user.avatar), '', 'user/user')" />
        </div>

        <div data-text>
            <span data-username v-text="$user.username" />

            <div data-roles>
                <span v-for="(role, index) in useAccessStore().roles" :key="role.id" data-role
                    v-text="role.title + (useAccessStore().roles.length === (index + 1) ? '' : ', ')" />
            </div>
        </div>
    </div>
</template>

<style scoped>
#profile_preview {
    cursor: pointer;
    width: 100%;
    min-width: 0;
    background-color: #ffffff;
    border-radius: 20px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px;

    overflow: hidden;
}

[data-img] {
    width: 100px;
    height: 100px;
    border-radius: 50%;

    margin-right: 30px;
}

[data-text] {
    width: 100%;
    min-width: 0;

    display: flex;
    flex-direction: column;
}

[data-username] {
    font-weight: 700;
    font-size: 22rem;
    line-height: 0.95;
    letter-spacing: -0.02em;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    margin-bottom: 10px;
}

[data-roles] {
    display: flex;

    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
}

[data-role] {
    font-weight: 500;
    font-size: 17rem;
    color: #676767;
    letter-spacing: -0.02em;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>