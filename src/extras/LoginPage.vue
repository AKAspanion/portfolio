<template>
    <div class="login-container">
        <v-container fluid ma-0 pa-0>
            <v-layout row wrap>
                <v-flex xs12 sm6 md7>
                    <v-card flat color="#0072ff" class="left-card">
                        <v-container fluid fill-height ma-0 pa-0>
                            <v-layout justify-space-between column>
                                <div class="left-item text-xs-left">
                                    <div class="logo-item">
                                        <img src="logo.svg" alt="gid logo" class="gid-logo" />
                                    </div>
                                </div>
                                <div class="left-item info-item text-xs-left">
                                    <img
                                        src="creative_login.svg"
                                        alt="gid creative"
                                        class="gid-pic"
                                    />
                                    <div class="gid-making">Making Enterprise Data</div>
                                    <div class="gid-clean">Transparent . Clean . Manageable</div>
                                    <div
                                        class="gid-desc"
                                    >Goes beyond traditional techniques to incorporate a more sophisticated approach to inventorying and managing data, classifying and organizing data and identifying, protecting and governing the sensitive data within</div>
                                </div>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6 md5>
                    <v-card flat color="white" class="right-card">
                        <v-container fluid fill-height ma-0 pa-0>
                            <v-layout align-center justify-space-between column>
                                <div class="right-item title-item text-xs-left">
                                    DATA
                                    <br />ECOSYSTEM
                                    <br />MANAGEMENT SUITE
                                </div>
                                <div class="right-item input-item text-xs-right">
                                    <div>
                                        <v-text-field label="Email"></v-text-field>
                                    </div>
                                    <div>
                                        <v-text-field label="Email"></v-text-field>
                                    </div>
                                </div>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            seePass: false,
            loading: false
        };
    }
};
</script>

<style scoped>
* {
    font-family: roboto;
    margin: 0;
    padding: 0;
}
.left-card {
    height: 100vh;
}
.right-card {
    height: 100vh;
}
.left-item{
    padding-left: var(--padding);
    padding-right: var(--padding);
}
.logo-item {
    padding-top: var(--padding);
}
.title-item {
    padding-top: var(--padding);
    width: calc(41.7vw - var(--padding));
    font-size: var(--gid-title-font-size);
    color: #56595d;
    font-weight: 500;
    line-height: 1em;
}
.info-item {
    color: white;
    padding-bottom: var(--padding);
}
.input-item {
    padding-bottom: var(--padding);
    width: calc(41.7vw - (var(--padding) * 2));
}
.gid-pic {
    width: var(--gid-pic-width);
}
.gid-logo {
    height: var(--gid-logo-height);
}
.gid-making {
    font-size: var(--gid-h2-font-size);
}
.gid-clean {
    font-weight: 500;
    font-size: var(--gid-h3-font-size);
}
.gid-desc {
    line-height: 1em;
    font-size: var(--gid-p-font-size);
}
@media screen and (max-width: 600px) {
    .login-container {
        --padding: 20px;
        --gid-logo-height: 28px;
        --gid-title-font-size: 28px;
    }
    .left-card {
        height: calc((var(--padding) * 2) + (var(--gid-logo-height)));
    }
    .right-card {
        height: calc(100vh - ((var(--padding) * 2) + (var(--gid-logo-height))));
    }
    .info-item {
        display: none;
    }
    .title-item,
    .input-item {
        width: calc(100vw);
        padding: var(--padding);
    }
}

@media screen and (min-width: 600px) and (max-width: 960px) {
    .login-container {
        --padding: 30px;
        --gid-logo-height: 24px;
        --gid-title-font-size: 24px;
        --gid-h2-font-size: 24px;
        --gid-h3-font-size: 15px;
        --gid-p-font-size: 12px;
        --gid-pic-width: 150px;
    }
    .title-item {
        padding-top: var(--padding);
        width: calc(50vw - (var(--padding) * 2.4));
    }
    .input-item {
        padding-bottom: var(--padding);
        width: calc(50vw - (var(--padding) * 2.4));
    }
}

@media screen and (min-width: 960px) and (max-width: 1368px) {
    .login-container {
        --padding: 60px;
        --gid-logo-height: 32px;
        --gid-title-font-size: 32px;
        --gid-h3-font-size: 20px;
        --gid-h2-font-size: 32px;
        --gid-p-font-size: 14px;
        --gid-pic-width: 240px;
    }
}

@media screen and (min-width: 1368px) and (max-width: 1904px) {
    .login-container {
        --padding: 100px;
        --gid-logo-height: 42px;
        --gid-title-font-size: 42px;
        --gid-h3-font-size: 24px;
        --gid-h2-font-size: 36px;
        --gid-p-font-size: 18px;
        --gid-pic-width: 280px;
    }
}
@media screen and (min-width: 1904px) {
    .login-container {
        --padding: 140px;
        --gid-logo-height: 56px;
        --gid-title-font-size: 56px;
        --gid-h3-font-size: 24px;
        --gid-h2-font-size: 36px;
        --gid-p-font-size: 18px;
        --gid-pic-width: 320px;
    }
}
</style>
