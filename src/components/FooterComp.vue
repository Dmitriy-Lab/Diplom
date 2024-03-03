<template>
    <footer class="footer">
        <LogoComp />
        <MenuComp class="menu_footer" />
        <div class="contacts">
            <p class="contacts__email">poznavshii@gmail.com</p>
            <p class="contacts__name">© Dmitriy-Lab</p>
        </div>
    </footer>
</template>

<script>
import LogoComp from './LogoComp.vue';
import MenuComp from './MenuComp.vue';
export default {
    components: { MenuComp, LogoComp },
    name: 'FooterComp',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss">
@import '../assets/variables.scss';

.footer {
    height: 90px;
    background-color: #C0D2E2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 3%;
}

.menu_footer .menu {
    flex-direction: column;

    & .menu__link {
        border: 0;
    }
}

.contacts {
    @include textPropertys($colorText, Open Sans, 14px, normal, 500, 125%);

    &__email {
        margin-top: 30px;
    }

    &__name {
        padding-top: 15px;
    }
}

@media screen and (max-width: 600px) { 
    .footer {
    padding: 5px;
}
    .contacts {
    @include textPropertys($colorText, Open Sans, 12px, normal, 500, 125%);
}
}
</style>