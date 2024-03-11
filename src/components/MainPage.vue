<template>
    <section class="main">
        <div class="converter">
            <h1 class="converter__title">Конвертер валют</h1>
            <h2 class="converter__current">Актуальный курс на сегодня</h2>
            <div class="tableParent">
                <div class="table" :key="componentKey">
                    <div class="table__grid">
                        <h4>Валюта</h4>
                    </div>
                    <div class="table__grid">
                        <h4>RUB</h4>
                    </div>
                    <div class="table__grid">
                        <p>Доллар США</p>
                    </div>
                    <div class="table__grid">
                        <p> {{ getUSD() }} </p>
                    </div>
                    <div class="table__grid">
                        <p>Евро</p>
                    </div>
                    <div class="table__grid">
                        <p>{{ getEUR() }}</p>
                    </div>
                    <div class="table__grid">
                        <p>Юань</p>
                    </div>
                    <div class="table__grid">
                        <p>{{ getCNY() }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="popular">
            <h3 class="popular__header">Популярные валюты</h3>
            <div class="currencies">
                <div class="currency">
                    <img class="currency__image" src="../assets/flags/rus.png" alt="flag">
                    <p class="currency__text">Российский рубль</p>
                </div>
                <div class="currency">
                    <img class="currency__image" src="../assets/flags/usa.png" alt="flag">
                    <p class="currency__text">Доллар США</p>
                </div>
                <div class="currency">
                    <img class="currency__image" src="../assets/flags/euro.png" alt="flag">
                    <p class="currency__text">Евро</p>
                </div>
                <div class="currency">
                    <img class="currency__image" src="../assets/flags/china.png" alt="flag">
                    <p class="currency__text">Юань</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    components: {},
    name: 'MainPage',

    data() {
        return {
            componentKey: 0,
        };
    },

    created() {
        this.getRates();

    },

    mounted() {
    },

    methods: {
        async getRates() {
            const url = new URL('https://www.cbr-xml-daily.ru/daily_json.js');
            const response = await fetch(url);
            const json = await response.json();
            localStorage.setItem('USD', json.Valute.USD.Value.toFixed(2));
            localStorage.setItem('EUR', json.Valute.EUR.Value.toFixed(2));
            localStorage.setItem('CNY', json.Valute.CNY.Value.toFixed(2));
            this.componentKey += 1;
        },
        getUSD() {
            const USD = localStorage.getItem('USD');
            if (USD) {
                return USD
            }
        },
        getEUR() {
            const EUR = localStorage.getItem('EUR');
            if (EUR) {
                return EUR
            }
        },
        getCNY() {
            const CNY = localStorage.getItem('CNY');
            if (CNY) {
                return CNY
            }
        },
    },
};
</script>

<style lang="scss">
@import '../assets/variables.scss';

.main {
    padding: 100px 3%;
    display: flex;
    gap: 25px;
}

.converter {
    width: 75%;
    padding-left: 10%;
    display: flex;
    flex-direction: column;

    &__title {
        padding-bottom: 50px;
        @include textPropertys($colorText, Montserrat, 32px, normal, 600, 125%);
    }

    &__current {
        padding-bottom: 30px;
        @include textPropertys($colorText, Open Sans, 22px, normal, 500, 125%);
    }
}

.tableParent {
    margin-right: auto;
    display: flex;
    padding: 2px;
    background-color: #385875;
}

.table {
    display: grid;
    grid-gap: 2px;
    grid-template-columns: 300px 300px;
    grid-template-rows: 60px 50px 50px 50px;
    @include textPropertys($colorText, Open Sans, 18px, normal, 500, 125%);

    &__grid {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 15px;
        background-color: #fff;
    }
}

.popular {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: end;

    &__header {
        padding-top: 20px;
        padding-bottom: 30px;
        @include textPropertys($colorText, Montserrat, 22px, normal, 500, 125%);
    }
}

.currencies {
    max-width: 280px;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    border: 3px solid #313E4A;
}

.currency {
    display: flex;
    align-items: center;
    gap: 25px;
    padding: 12px 25px;
    transition: all 0.2s;

    &:nth-child(1),
    &:nth-child(3) {
        background-color: #e8f0f7;
    }

    &__image {
        width: 28px;
    }

    &__text {
        @include textPropertys($colorText, Open Sans, 14px, normal, 400, 125%);
    }
}

@media screen and (max-width: 1125px) {
    .currency {

        gap: 15px;

        padding: 12px 15px;

    }
}

@media screen and (max-width: 1000px) {

    .main {
        flex-direction: column;
    }

    .popular {
        width: 80%;
        padding-left: 10%;
    }
}

@media screen and (max-width: 730px) {

    .converter {
        width: 100%;
        padding-left: 0%;
    }

    .popular {
        width: 100%;
        padding-left: 0%;
    }
}

@media screen and (max-width: 640px) {

    .table {
        grid-template-columns: 200px 200px;
        grid-template-rows: 60px 50px 50px 50px;
    }
}

@media screen and (max-width: 430px) {

    .table {
        grid-template-columns: 150px 150px;
        grid-template-rows: 50px 40px 40px 40px;
        @include textPropertys($colorText, Open Sans, 14px, normal, 500, 125%);

        &__grid {
            padding-left: 10px;
        }
    }

    .converter {

        &__title {
            @include textPropertys($colorText, Montserrat, 28px, normal, 600, 125%);
        }

        &__current {
            @include textPropertys($colorText, Open Sans, 20px, normal, 500, 125%);
        }
    }
}
</style>