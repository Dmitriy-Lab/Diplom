<template>
    <div class="logo" @click="$router.push({name:'MainPage'})">
        <img class="logo__image" @click="balance" src="../assets/logo.svg" alt="logo">
        <p class="logo__text" @click="balance">Exchange</p>
    </div>
</template>

<script>
export default {
    name: 'LogoComp',

    data() {
        return {    
        };
    },


    methods: {
        balance() {
            this.$emit('check', {
                balanceRUB: localStorage.getItem('balanceRUB'),
            })
        }
    },
};
</script>

<style lang="scss" >
@import '../assets/variables.scss';

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;

    &__text {
        @include textPropertys($colorText, Montserrat, 24px, normal, 600, 125%);
    }
}

@media screen and (max-width: 792px) {
    .logo__image {
        width: 25px;
        height: 25px;
    }

    .logo__text {
        @include textPropertys($colorText, Montserrat, 18px, normal, 600, 125%);
    }
}

</style>