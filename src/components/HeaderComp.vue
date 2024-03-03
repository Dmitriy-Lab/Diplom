<template>
    <header class="header">
        <LogoComp @check='onCheck' />
        <MenuComp @check='onCheck' />
        <div class="balance" >
            <p class="balance__show" v-if="this.$route.name === 'MainPage'">Ваш баланс: {{ balanceRUB }} ₽</p>
            <button class="balance__add" @click="show" v-if="this.$route.name === 'MainPage'">Пополнить</button>
        </div>
        <div class="popup" :class="{ active: isActive }">
            <div class="popup__container">
                <button class="popup__close-button" @click="show">
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 352 512">
                        <path
                            d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z" />
                    </svg>
                </button>
                <div class="popup__content">
                    <h3 class="popup__heading">Введите сумму пополнения</h3>
                    <div class="popup__input-box">
                        <input type="number" class="popup__input" v-model="addRUB">
                        <p class="popup__input-currency">₽</p>
                    </div>
                    <button class="popup__submit" @click="addBalanceRUB">Пополнить</button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import LogoComp from './LogoComp.vue';
import MenuComp from './MenuComp.vue';
export default {
    components: { MenuComp, LogoComp },
    name: 'HeaderComp',

    data() {
        return {
            balanceRUB: this.checkBalance(),
            isActive: false,
            addRUB: ''
        };
    },

    mounted() {

    },

    created() {
        this.checkBalance();
    },

    computed: {
    },

    methods: {
        show() {
            this.isActive = !this.isActive;
        },
        addBalanceRUB() {
            if (Number.isInteger(Number(this.addRUB[0]))) {
                this.balanceRUB = Number(this.balanceRUB) + Number(this.addRUB);
                this.balanceRUB = this.balanceRUB.toFixed(2);
                this.addRUB = '';
                localStorage.setItem('balanceRUB', this.balanceRUB);
                this.isActive = !this.isActive;
            } else {
                this.addRUB = ''
            }
        },
        checkBalance() {
            const balance = localStorage.getItem('balanceRUB');
            if (!balance) {
                localStorage.setItem('balanceRUB', 10000)
                return 10000;
            }
            else {
                return localStorage.getItem('balanceRUB');
            }
        },
        onCheck(data) {
            this.balanceRUB = data.balanceRUB
        },
    },
};
</script>

<style lang="scss">
@import '../assets/variables.scss';

.popup {
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: all .5s;
    visibility: hidden;

    &__container {
        align-items: center;
        display: flex;
        justify-content: center;
        position: relative;
        padding: 25px;
        ;
    }

    &__close-button {
        background-color: inherit;
        background-size: cover;
        border: 0;
        cursor: pointer;
        height: 32px;
        position: absolute;
        right: 0;
        top: 0;
        transition: all .2s;
        width: 32px;
        opacity: 0.6;
    }

    &__content {
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        padding: 15px;
        width: 400px;
        position: relative;
    }

    &__heading {
        margin: 45px 0px;
        @include textPropertys($colorText, Open Sans, 24px, normal, 600, 125%);
    }

    &__input {

        &-box {
            display: flex;
            margin-bottom: 15px;
            padding-left: 15px;
        }

        &-currency {
            padding-left: 10px;
            @include textPropertys($colorText, Open Sans, 18px, normal, 500, 125%);
        }
    }

    &__submit {
        margin-top: 30px;
        padding: 7px 15px;
        margin-bottom: 30px;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid $colorText;
        background-color: #fff;
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);

        &:hover {
            background-color: #fff;
            border: 1px solid black;
            box-shadow: 3px 3px 8px 2px rgb(170, 170, 170);
        }
    }
}

.active {
    visibility: visible;
    opacity: 1;
}

.header {
    min-height: 60px;
    background-color: #C0D2E2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 3%;
}

.balance {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
    min-width: 160px;

    &__show {
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
    }

    &__add {
        padding: 5px 10px;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid $colorText;
        background-color: #e7e7e7;
        @include textPropertys($colorText, Open Sans, 14px, normal, 500, 125%);

        &:hover {
            background-color: #fff;
            border: 1px solid black;
        }
    }
}

@media screen and (max-width: 792px) {
    .balance {
        min-width: 140px;

        &__show {
            @include textPropertys($colorText, Open Sans, 14px, normal, 500, 125%);
        }

        &__add {
            padding: 3px 8px;
            box-sizing: border-box;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid $colorText;
            background-color: #e7e7e7;
            @include textPropertys($colorText, Open Sans, 12px, normal, 500, 125%);

        }
    }

    .header {
        padding: 12px 3%;
    }
}

@media screen and (max-width: 600px) {
    .header {
        padding: 5px;
    }

    .popup {
        &__container {
            padding: 25px;
        }

        &__content {

            padding: 10px;
            width: 260px;
        }

        &__heading {
            margin: 45px 0px;
            text-align: center;
            @include textPropertys($colorText, Open Sans, 24px, normal, 600, 125%);
        }
    }
}
</style>