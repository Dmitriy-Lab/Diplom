<template>
    <div class="menu-box">
        <nav class="menu" @click="balance">
            <p class="menu__link" @click="$router.push({ name: 'MainPage' })">Главная</p>
            <p class="menu__link" @click="$router.push({ name: 'ExchangePage' })">Обмен валют</p>
        </nav>
        <nav class="dropdown">
            <button class="dropbtn" @click="show">Меню</button>
            <div class="dropdown__content" @click="balance" :class="{ show: isActive }">
                <p class="menu__link" @click="$router.push({ name: 'MainPage' })">Главная</p>
                <p class="menu__link" @click="$router.push({ name: 'ExchangePage' })">Обмен валют</p>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'MenuComp',

    data() {
        return {
            isActive: false,
        };
    },

    mounted() {

    },

    methods: {
        show() {
            this.isActive = !this.isActive;
        },
        balance() {
            this.$emit('check', {
                balanceRUB: localStorage.getItem('balanceRUB')
            })
            this.isActive = !this.isActive;
        }
    },
};
</script>

<style lang="scss">
@import '../assets/variables.scss';

.dropdown {
    display: none;
}


.menu {
    display: flex;

    &__link {
        display: block;
        padding: 5px 10px;
        cursor: pointer;
        text-decoration: none;
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
        transition: all 0.2s;

        &:nth-child(2) {
            border-left: 1px solid black;
        }

        &:hover {
            color: grey;
        }
    }
}

@media screen and (max-width: 792px) {

    .menu {

        &__link {
            padding: 5px 7px;
            @include textPropertys($colorText, Open Sans, 12px, normal, 500, 125%);


        }
    }
}

@media screen and (max-width: 600px) {
    .dropdown {
        display: block;

        &__content {
            display: none;
            position: absolute;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            background-color: #fff;
        }
    }

    .dropbtn {
        border: 0;
        cursor: pointer;
        background-color: inherit;
        @include textPropertys($colorText, Open Sans, 14px, normal, 600, 125%);
    }

    .show {
        display: block;
    }

    .menu {
        display: none;

        &__link {

            &:nth-child(2) {
                border-left: 0;
                border-right: 0;
            }


        }
    }
}
</style>