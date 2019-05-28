<template>
    <div class="wrapper" >
        <nav class="nav__wrapper" id="navbar-example">
            <ul class="nav">
                <li
                    role="presentation" 
                    v-for="n in 6"
                    :key="n">
                <a            
                    @click="scrollMeTo('section'+n)"
                    >
                    <div class="nav__counter">0{{n}}</div>
                    <h3 class="nav__title">Section {{n}} Title</h3>
                    <p class="nav__body">
                        <strong>Timeline-style navigation</strong>. 
                        Scroll down to see what happens, or click on a number in the nav.
                    </p>
                </a>
                </li>
            </ul>
        </nav>
        <section 
            v-for="n in 6"
            :class="['section section'] + n" 
            :key="n"
            :id="['section'+n]">
            Scroll down or use the nav {{n}}.
        </section>
  </div>
</template>

<script>
export default {
    data(){
        return{
            active: true
        }
    },
    methods: {
        onLiClick(n){
            console.log(n);
        },        
        scrollMeTo(refName) {
            var element = document.getElementById(refName);
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': element.offsetTop
            });
        }
    }
}
</script>

<style>
.wrapper {
  min-height: 100vh;
  font-family: "Roboto Slab", serif;
  font-weight: 300;
  color: #fff;
  position: relative;
}

section {
  height: 100vh;
  font-size: 40px;
  font-weight: 100;
  background-color: #22a7f0;
  display: flex;
  justify-content: center;
  align-items: center;
}
section:nth-child(1) {
  background: white;
}
section:nth-child(2) {
  background: #f64747;
}
section:nth-child(3) {
  background: #22a7f0;
}
section:nth-child(4) {
  background: #f9690e;
}
section:nth-child(5) {
  background: #9b59b6;
}
section:nth-child(6) {
  background: #03c9a9;
}
section:nth-child(7) {
  background: #ffcc00;
}

.nav__wrapper {
  position: fixed;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
}
.nav {
  margin: 0 0 100px 30px;
}
.nav__counter {
  font-size: 24px;
  transition: all 0.15s ease-out;
}
.nav__title {
  font-size: 32px;
  font-weight: 300;
  margin: 0 0 0.25em;
  width: 300px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: height 0.3s ease-out, opacity 0.2s ease-out;
}
.nav__body {
  font-weight: 100;
  font-size: 18px;
  font-size: 18px;
  width: 300px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: height 0.3s ease-out, opacity 0.2s ease-out;
}
.nav li {
  position: relative;
  transition: all 0.3s ease-out;
  margin-bottom: 1em;
}
.nav li:after {
  content: "";
  display: block;
  border-left: 2px solid white;
  border-top: 2px solid white;
  height: 250px;
  width: 20px;
  position: absolute;
  left: -30px;
  top: 15px;
}
.nav li a {
  display: block;
  padding: 0;
  color: #fff;
  transition: all 0.15s ease-out;
}
.nav li a:hover {
  background-color: transparent;
  padding-left: 1em;
}
.nav li a:focus {
  background-color: transparent;
}
.nav li.active {
  pointer-events: none;
  padding-left: 1em;
}
.nav li.active:after {
  width: 35px;
  height: 400px;
  top: 35px;
}
.nav li.active .nav__counter {
  font-size: 48px;
}
.nav li.active .nav__title {
  height: 40px;
  opacity: 1;
  overflow: visible;
}
.nav li.active .nav__body {
  height: 100px;
  opacity: 1;
  overflow: visible;
}

</style>
