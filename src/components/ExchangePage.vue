<template>
    <section class="exchange">
        <div class="content">
            <div class="conv">
                <div class="heading">
                    <h1 class="heading__title">Обмен валют</h1>
                </div>
                <div class="converte">
                    <h2 class="converte__heading">Конвертер по курсу ЦБ на сегодня</h2>
                    <div class="converte__exchange">
                        <div class="converte__first">
                            <input class="converte__input" type="number" v-model.number="inputNum"
                                @input="onInput(inputNum)">
                            <select class="converte__select" v-model="selectedYour" @click="onInput(inputNum)">
                                <option value="RUB">RUB</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="CNY">CNY</option>
                            </select>
                        </div>
                        <svg class="converte__arrow" xmlns="http://www.w3.org/2000/svg" height="25" width="18"
                            viewBox="0 0 448 512">
                            <path
                                d="M313.9 216H12c-6.6 0-12 5.4-12 12v56c0 6.6 5.4 12 12 12h301.9v46.1c0 21.4 25.9 32.1 41 17l86.1-86.1c9.4-9.4 9.4-24.6 0-33.9l-86.1-86.1c-15.1-15.1-41-4.4-41 17V216z" />
                        </svg>
                        <div class="converte__second">
                            <input class="converte__input" disabled type="number" v-model="showVal">
                            <select class="converte__select" v-model="selectedNew" @click="onInput(inputNum)">
                                <option value="RUB">RUB</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="CNY">CNY</option>
                            </select>
                        </div>
                    </div>
                    <span class="converte__alert" :class="{ alert: isAlert }">Недостаточно средств</span>
                    <button class="converte__submit" @click="exchange" :disabled="isDisabled"
                        :class="{ disabled: isDisabled }">Обменять</button>
                </div>
            </div>
            <div class="money">
                <div class="money__title">
                    <h1 class="heading__title">Обмен валют</h1>
                </div>
                <h2 class="money__heading">Ваши средства</h2>
                <div class="money__info">
                    <div class="money__conetent">
                        <img class="currency__image" src="../assets/flags/rus.png" alt="flag">
                        <p class="money__text">{{ balanceRUB }} RUB</p>
                    </div>
                    <div class="money__conetent">
                        <img class="currency__image" src="../assets/flags/usa.png" alt="flag">
                        <p class="money__text">{{ balanceUSD }} USD</p>
                    </div>
                    <div class="money__conetent">
                        <img class="currency__image" src="../assets/flags/euro.png" alt="flag">
                        <p class="money__text">{{ balanceEUR }} EUR</p>
                    </div>
                    <div class="money__conetent">
                        <img class="currency__image" src="../assets/flags/china.png" alt="flag">
                        <p class="money__text">{{ balanceCNY }} CNY</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inputOutput">
            <h2 class="inputOutput__title">Пополнение / Вывод</h2>
            <div class="inputOutput__buttons">
                <button class="inputOutput__input inputOutput__btn" @click="showPopupInput"><img
                        class="inputOutput__arrowNormal" src="../assets/arrow.svg">Пополнить<img
                        class="inputOutput__arrowNormal" src="../assets/arrow.svg"></button>
                <button class="inputOutput__output inputOutput__btn" @click="showPopupOutput"><img
                        class="inputOutput__arrowRevers" src="../assets/arrow.svg">Вывести<img
                        class="inputOutput__arrowRevers" src="../assets/arrow.svg"></button>
            </div>
        </div>
        <div class="popup" :class="{ active: isActive }">
            <div class="popup__container">
                <button class="popup__close-button" @click="showPopupInput">
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
        <div class="popup popup__output" :class="{ open: isOpen }">
            <div class="popup__container">
                <button class="popup__close-button" @click="showPopupOutput">
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 352 512">
                        <path
                            d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z" />
                    </svg>
                </button>
                <div class="popup__content">
                    <h3 class="popup__heading">Введите сумму снятия</h3>
                    <div class="popup__input-box">
                        <input class="popup__input" type="number" v-model="quantityOutput" @click="hideAlert">
                        <select class="popup__select" v-model="selectedOutput" @click="hideAlert">
                            <option value="0">RUB</option>
                            <option value="1">USD</option>
                            <option value="2">EUR</option>
                            <option value="3">CNY</option>
                        </select>

                    </div>
                    <span class="popup__alert" :class="{ visibility: isVisibility }">Недостаточно средств</span>
                    <button class="popup__submit" @click="output">Вывести</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ExchangePage',
    data() {
        return {
            balanceRUB: this.takeBalanceRUB(),
            balanceUSD: this.takeBalanceUSD(),
            balanceEUR: this.takeBalanceEUR(),
            balanceCNY: this.takeBalanceCNY(),
            isActive: false,
            isOpen: false,
            isVisibility: false,
            isDisabled: false,
            isAlert: false,
            addRUB: '',
            selectedOutput: 0,
            selectedYour: 'RUB',
            selectedNew: 'USD',
            inputNum: '',
            showVal: '',
            currency: [
                { title: 'RUB', rate: 1, val: 0, balance: this.balanceRUB },
                { title: 'USD', rate: localStorage.getItem('USD'), val: 0, balance: this.balanceUSD },
                { title: 'EUR', rate: localStorage.getItem('EUR'), val: 0, balance: this.balanceEUR },
                { title: 'CNY', rate: localStorage.getItem('CNY'), val: 0, balance: this.balanceCNY }
            ],
        };
    },

    created() {
        this.getRates();
    },

    methods: {
        onInput(val) {
            this.isAlert = false;
            this.isDisabled = false;
            const strVal = val + '';
            if (!Number.isInteger(Number(strVal[0]))) {
                this.isDisabled = true;
            }

            if (this.selectedYour == this.selectedNew) {
                this.isDisabled = true;
            }
            this.currency.forEach(n => {
                if (n.title == this.selectedYour) {
                    if ((n.title == 'RUB' && val > this.balanceRUB) || (n.title == 'USD' && val > this.balanceUSD) || (n.title == 'EUR' && val > this.balanceEUR) || (n.title == 'CNY' && val > this.balanceCNY)) {
                        this.isAlert = true;
                        this.isDisabled = true;
                    }
                    n.val = val;
                }
            });
            this.currency.forEach(n => {
                if (n.title == this.selectedNew) {
                    const rate = localStorage.getItem([this.selectedYour]);
                    n.val = val * rate / n.rate;
                    this.showVal = n.val.toFixed(2)
                }
            });
        },
        exchange() {
            this.currency.forEach(n => {
                if (n.title == this.selectedYour) {
                    if (n.title == 'RUB') {
                        this.balanceRUB = Number(this.balanceRUB).toFixed(2) - Number(n.val).toFixed(2);
                        localStorage.setItem('balanceRUB', this.balanceRUB);
                    } else if (n.title == 'USD') {
                        this.balanceUSD = Number(this.balanceUSD).toFixed(2) - Number(n.val).toFixed(2);
                        localStorage.setItem('balanceUSD', this.balanceUSD);
                    } else if (n.title == 'EUR') {
                        this.balanceEUR = Number(this.balanceEUR).toFixed(2) - Number(n.val).toFixed(2);
                        localStorage.setItem('balanceEUR', this.balanceEUR);
                    } else if (n.title == 'CNY') {
                        this.balanceCNY = Number(this.balanceCNY).toFixed(2) - Number(n.val).toFixed(2);
                        localStorage.setItem('balanceCNY', this.balanceCNY);
                    }
                }
            })
            this.currency.forEach(n => {
                if (n.title == this.selectedNew) {
                    if (n.title == 'RUB') {
                        this.balanceRUB = Number(Number(this.balanceRUB) + n.val).toFixed(2);
                        localStorage.setItem('balanceRUB', this.balanceRUB);
                    } else if (n.title == 'USD') {
                        this.balanceUSD = Number(Number(this.balanceUSD) + n.val).toFixed(2);
                        localStorage.setItem('balanceUSD', this.balanceUSD);
                    } else if (n.title == 'EUR') {
                        this.balanceEUR = Number(Number(this.balanceEUR) + n.val).toFixed(2);
                        localStorage.setItem('balanceEUR', this.balanceEUR);
                    } else if (n.title == 'CNY') {
                        this.balanceCNY = Number(Number(this.balanceCNY) + n.val).toFixed(2);
                        localStorage.setItem('balanceCNY', this.balanceCNY);
                    }
                }
            })
            this.onInput(this.inputNum);
        },
        async getRates() {
            const url = new URL('https://www.cbr-xml-daily.ru/daily_json.js');
            const response = await fetch(url);
            const json = await response.json();
            localStorage.setItem('USD', json.Valute.USD.Value.toFixed(2));
            localStorage.setItem('EUR', json.Valute.EUR.Value.toFixed(2));
            localStorage.setItem('CNY', json.Valute.CNY.Value.toFixed(2));
            localStorage.setItem('RUB', 1);
        },
        takeBalanceRUB() {
            this.balanceRUB = localStorage.getItem('balanceRUB');
            return Number(this.balanceRUB).toFixed(2)
        },
        takeBalanceUSD() {
            const balance = localStorage.getItem('balanceUSD');
            if (!balance) {
                return 0;
            } else {
                return Number(balance).toFixed(2);
            }
        },
        takeBalanceEUR() {
            const balance = localStorage.getItem('balanceEUR');
            if (!balance) {
                return 0;
            } else {
                return Number(balance).toFixed(2);
            }
        },
        takeBalanceCNY() {
            const balance = localStorage.getItem('balanceCNY');
            if (!balance) {
                return 0;
            } else {
                return Number(balance).toFixed(2);
            }
        },
        showPopupInput() {
            this.isActive = !this.isActive;
        },
        showPopupOutput() {
            this.isOpen = !this.isOpen;
            this.isVisibility = false;
        },

        hideAlert() {
            this.isVisibility = false;
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

        output() {
            if (Number.isInteger(Number(this.quantityOutput[0]))) {
                if (this.selectedOutput == 0) {
                    if (this.quantityOutput > this.balanceRUB) {
                        this.isVisibility = true;
                    } else {
                        this.balanceRUB = Number(this.balanceRUB) - Number(this.quantityOutput);
                        this.balanceRUB = this.balanceRUB.toFixed(2);
                        this.quantityOutput = '';
                        localStorage.setItem('balanceRUB', this.balanceRUB);
                        this.isOpen = !this.isOpen;
                    }
                } else if (this.selectedOutput == 1) {
                    if (this.quantityOutput > this.balanceUSD) {
                        this.isVisibility = true;
                    } else {
                        this.balanceUSD = Number(this.balanceUSD) - Number(this.quantityOutput);
                        this.balanceUSD = this.balanceUSD.toFixed(2);
                        this.quantityOutput = '';
                        localStorage.setItem('balanceUSD', this.balanceUSD);
                        this.isOpen = !this.isOpen;
                    }
                } else if (this.selectedOutput == 2) {
                    if (this.quantityOutput > this.balanceEUR) {
                        this.isVisibility = true;
                    } else {
                        this.balanceEUR = Number(this.balanceEUR) - Number(this.quantityOutput);
                        this.balanceEUR = this.balanceEUR.toFixed(2);
                        this.quantityOutput = '';
                        localStorage.setItem('balanceEUR', this.balanceEUR);
                        this.isOpen = !this.isOpen;
                    }
                } else if (this.selectedOutput == 3) {
                    if (this.quantityOutput > this.balanceCNY) {
                        this.isVisibility = true;
                    } else {
                        this.balanceCNY = Number(this.balanceCNY) - Number(this.quantityOutput);
                        this.balanceCNY = this.balanceCNY.toFixed(2);
                        this.quantityOutput = '';
                        localStorage.setItem('balanceCNY', this.balanceCNY);
                        this.isOpen = !this.isOpen;
                    }
                }
            }
            this.quantityOutput = '';
            this.onInput(this.inputNum);
        }
    },
};
</script>

<style lang="scss">
@import '../assets/variables.scss';

.exchange {
    padding: 100px 3%;
}

.content {
    display: flex;
}

.heading__title {
    padding-bottom: 50px;
    @include textPropertys($colorText, Montserrat, 32px, normal, 600, 125%);
}

.money {
    width: 25%;
    padding-bottom: 60px;

    &__title {
        display: none;
    }

    &__heading {
        padding-bottom: 30px;
        @include textPropertys($colorText, Open Sans, 22px, normal, 500, 125%);
    }

    &__conetent {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 6px 25px 6px 0px;
    }

    &__text {
        @include textPropertys($colorText, Open Sans, 16px, normal, 400, 125%);
    }
}

.conv {
    width: 75%;
    padding-left: 10%;
}

.converte {
    padding: 0 10%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__heading {
        padding-bottom: 50px;
        @include textPropertys($colorText, Open Sans, 24px, normal, 500, 125%);
    }

    &__exchange {
        display: flex;
        gap: 25px;
        padding-bottom: 60px;
    }

    &__input {
        padding: 3px 5px;
        height: 30px;
        box-sizing: border-box;
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
    }

    &__select {
        padding: 3px 5px;
        height: 30px;
        box-sizing: border-box;
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
    }

    &__alert {
        visibility: hidden;
        position: absolute;
        bottom: 55px;
        @include textPropertys(red, Open Sans, 12px, normal, 500, 125%);
    }

    &__submit {
        padding: 9px 16px;
        cursor: pointer;
        background-color: #f8f8f8;
        box-sizing: border-box;
        border: 0;
        outline: 1px solid $colorText;
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
        transition: all 0.3s;


        &:hover {
            background-color: #fff;
        }
    }
}

.inputOutput {
    margin-top: 100px;
    padding-left: 10%;
    display: flex;
    flex-direction: column;
    align-items: start;

    &__title {
        margin-bottom: 80px;
        @include textPropertys($colorText, Montserrat, 28px, normal, 600, 125%);
    }

    &__buttons {
        border: 2px solid #6c869d;
        border-radius: 5px;
        display: flex;
        gap: 60px;
        padding: 40px;
    }

    &__input {
        background-color: #d5d388;
        transition: all 0.3s;

        &:hover {
            background-color: #c2bf6f;
        }
    }

    &__output {
        background-color: #cb829b;
        transition: all 0.3s;

        &:hover {
            background-color: #c37791;
        }
    }

    &__btn {
        border: 1px solid #6c869d;
        cursor: pointer;
        padding: 8px 7px;
        @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
    }

    &__arrowNormal {
        padding: 0px 6px;
        transform: rotate(270deg);
    }

    &__arrowRevers {
        padding: 0px 6px;
        transform: rotate(90deg);
    }

}

.popup {
    &__input {
        padding: 3px 5px;

        box-sizing: border-box;
        @include textPropertys($colorText, Open Sans, 14px, normal, 500, 125%);
    }

    &__select {
        padding: 3px 5px;

        box-sizing: border-box;
        @include textPropertys($colorText, Open Sans, 14px, normal, 500, 125%);
    }

    &__alert {
        visibility: hidden;
        position: absolute;
        bottom: 100px;
        @include textPropertys(red, Open Sans, 12px, normal, 500, 125%);
    }
}

.active,
.visibility,
.open,
.alert {
    visibility: visible;
    opacity: 1;
}

.disabled {
    background-color: rgb(198, 198, 198);
    opacity: 0.5;
    cursor: default;

    &:hover {
        background-color: rgb(198, 198, 198);
        ;
    }
}

@media screen and (max-width: 1200px) {
    .conv {
        width: 75%;
        padding-left: 0%;
    }
}

@media screen and (max-width: 1085px) {
    .converte {
        padding: 0 0%;
    }
}


@media screen and (max-width: 915px) {

    .exchange {
        padding: 60px 3%;

    }

    .content {
        flex-direction: column-reverse;
    }

    .money {
        width: 100%;
        padding-bottom: 40px;

        &__title {
            display: block;
        }
    }

    .conv {
        width: 100%;
        padding-left: 0%;
    }

    .heading {
        display: none;
    }
}

@media screen and (max-width: 660px) {
    .converte__exchange {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding-bottom: 40px;
    }

    .converte__arrow {
        transform: rotate(90deg);
    }
}

@media screen and (max-width: 530px) {

    .inputOutput {
        margin-top: 60px;
        padding-left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__title {
            margin-bottom: 30px;
            @include textPropertys($colorText, Montserrat, 24px, normal, 500, 125%);
        }

        &__buttons {
            border: 2px solid #6c869d;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            gap: 50px;
            padding: 50px;
        }

        &__input {
            background-color: #d5d388;
            transition: all 0.3s;

            &:hover {
                background-color: #c2bf6f;
            }
        }

        &__output {
            background-color: #cb829b;
            transition: all 0.3s;

            &:hover {
                background-color: #c37791;
            }
        }

        &__btn {
            border: 1px solid #6c869d;
            cursor: pointer;
            padding: 8px 7px;
            @include textPropertys($colorText, Open Sans, 16px, normal, 500, 125%);
        }

        &__arrowNormal {
            padding: 0px 6px;
            transform: rotate(270deg);
        }

        &__arrowRevers {
            padding: 0px 6px;
            transform: rotate(90deg);
        }

    }
}

@media screen and (max-width: 500px) {
    .converte__heading {
        text-align: center;
        @include textPropertys($colorText, Open Sans, 20px, normal, 500, 125%);
    }
}
</style>