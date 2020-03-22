<template>
    <div class="contact-container" :style="containerStyle">
        <div class="contact-wrapper">
            <div class="px-12 mx-2">To get in touch with me.</div>
            <div class="contact-block pa-12">
                <div class="d-flex align-center ml-2">
                    <div style="width: 20vw;">Please email me:</div>
                    <div style="width: calc(100% - 20vw);">EMail</div>
                </div>
                <div class="d-flex align-center ml-2">
                    <div style="width: 20vw;">or call me at:</div>
                    <div style="width: calc(100% - 20vw);">EMail</div>
                </div>
                <div class="d-flex align-start ml-2">
                    <div style="width: 20vw;">
                        or send me a message right now:
                    </div>
                    <div style="width: calc(100% - 20vw);">
                        <div class="contact">
                            <form id="form">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="NAME"
                                />
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="E-MAIL"
                                />
                                <textarea
                                    id="message"
                                    type="text"
                                    placeholder="MESSAGE"
                                ></textarea>
                                <input
                                    id="submit"
                                    type="submit"
                                    value="CONNECT!"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpanionContact',
    computed: {
        containerStyle() {
            if (this.$vuetify.theme.dark) {
                return {
                    background: '#212121',
                    color: '#e0e0e0',
                };
            } else {
                return {
                    background: '#e0e0e0',
                    color: '#212121',
                };
            }
        },
    },
};
</script>

<style scoped>
.contact-container {
    width: 100vw;
    text-align: left;
    height: 100%;
    min-height: 100vh;
    padding: 64px 10vw 64px 15vw;
}
.contact-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
}
.contact-text {
    font-size: 10vw;
    line-height: 10vw;
    text-transform: uppercase;
    font-weight: 300 !important;
    font-family: Roboto, sans-serif !important;
}
.contact {
    margin: 0 auto;
    text-align: center;
}
#form {
    width: 500px;
    margin: 0 auto;
}

input {
    font-family: 'Roboto';
    font-size: 0.675rem;
    width: 470px;
    height: 50px;
    padding: 0px 15px 0px 15px;
    background: transparent;
    outline: none;
    color: #fff;
    border: solid 1px #212121;
    border-bottom: none;
    transition: all 0.3s ease-in-out;
}

input:hover {
    background: #17252a;
    color: #e0e0e0;
}

textarea {
    width: 470px;
    max-width: 470px;
    height: 110px;
    max-height: 110px;
    padding: 15px;
    background: transparent;
    outline: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 0.675rem;
    border: solid 1px #212121;
    transition: all 0.3s ease-in-out;
}

textarea:hover {
    background: #17252a;
    color: #e0e0e0;
}

#submit {
    max-width: 470px;
    padding: 0;
    margin: -6px 0px 0px 0px;
    font-family: 'Roboto';
    font-size: 0.675rem;
    color: #212121;
    outline: none;
    cursor: pointer;
    border: solid 1px #212121;
    border-top: none;
}

#submit:hover {
    color: #fff;
}
::placeholder {
    color: #212121;
    opacity: 1;
}
@media only screen and (max-width: 600px) {
    #form {
        width: 280px;
    }
    input {
        width: 250px;
    }
    textarea {
        width: 250px;
    }
}
</style>
