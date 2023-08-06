const mouse = document.querySelector(".cursor");
const burger = document.querySelector(".burger");

let controller1;
let controller2;
let scene1;
let scene2;


function pizzaAnimation() {
    gsap.fromTo(".image", 3, { x: "100%" }, { x: "0%", ease: "back.out(1.7)" });

    //controller 1
    controller1 = new ScrollMagic.Controller();
    const cards = document.querySelector(".cards");

    const t1 = gsap.timeline({ ease: "power2.inOut" });
    t1.fromTo(".animation", { y: "50%", opacity: 0, scale: 0 }, { y: "0%", opacity: 1, scale: 1 });
        
    scene1 = new ScrollMagic.Scene({
        triggerElement: cards,
        triggerHook: 0.6
 
    })
        .setPin(t1, { pushFollowers: false })
        .setTween(t1)
        // .addIndicators({ colorStart: "white", colorTrigger: "white" })
        .addTo(controller1);
        
    //controller 2
    controller2 = new ScrollMagic.Controller();
  
        const contact = document.querySelector(".contact");
        const revealImage = document.querySelector(".revealImage");
    const revealText = document.querySelector(".revealText");
    const realImage = document.querySelector(".contact-img img")

        const t2 = gsap.timeline({ ease: "power2.inOut" });
        t2.fromTo(revealText, 0.75, { x: "0%" }, { x: "100%" });
    t2.fromTo(realImage,  { scale: 0 }, { scale: 1 }, '-=0.5');

        scene2 = new ScrollMagic.Scene({
            triggerElement: contact,
            triggerHook: 0.4
     
        })
            .setPin(t2, { pushFollowers: false })
            .setTween(t2)
            // .addIndicators({ colorStart: "white", colorTrigger: "white" })
            .addTo(controller2);
    
}


//second page animations

function ballAnimation() {
    const balls = document.querySelectorAll(".ball");
        const circl = document.querySelector(".delivery-circle")
    balls.forEach(ball => {
        gsap.fromTo(ball, 3.5, {y:"-100%"}, {y:"0%", ease: "bounce.out"});
        
    });
    gsap.fromTo(circl, 2, { x: "100%" }, { x:  "0%" , ease: "back.out(2)" });
}

// cursor animation

function cursorAnimation(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
  
}

function cursorActive(e) {
    const item = e.target;
    const cursorText = document.querySelector(".cursor-text");

    if (item.classList.contains("delivery") || item.classList.contains("Order") || item.classList.contains("check") || item.classList.contains("submit") || item.classList.contains("order")) {
        mouse.classList.add("btn-active");
        gsap.to(".color-h1", 1, { y: "0%" , ease: "slow(0.7, 0.7, false)"});
        gsap.to(".delivery-colr", 1, { y: "0%" , ease: "slow(0.7, 0.7, false)"});
        cursorText.innerText = "Tap";
    }
    else if (item.id === "logo" || item.classList.contains("icon")) {
        mouse.classList.add("nav-active");
    }
    else if ( item.classList.contains("Delivery") || item.classList.contains("delivery-text") || item.classList.contains("delivery-image")) {
        mouse.classList.add("delivery-active");
    }
    else {
        mouse.classList.remove("btn-active");
        mouse.classList.remove("nav-active");
        cursorText.innerText = "";
        mouse.classList.remove("delivery-active");
        gsap.to(".color-h1", 1, { y: "100%", ease: "slow(0.8, 0.8, false)" });
        gsap.to(".delivery-colr", 1, { y: "100%" , ease: "slow(0.7, 0.7, false)"});
    }
}

//Barba transitions
document.addEventListener("DOMContentLoaded", function () {
    barba.init({

        views: [
            {
                namespace: "home",
                afterEnter() {
                    pizzaAnimation();
                },

                beforeLeave() {
                    controller1.destroy();
                    controller2.destroy();
                    scene1.destroy();
                    scene2.destroy();
                
                }
            },
            {
                namespace: "delivery",
                afterEnter() {
                    ballAnimation();
                }
            }
        ],

        transitions: [
            {
                leave({ current, next }) {
                    let done = this.async();
                    const t1 = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                    t1.fromTo(current.container, 0.5, { opacity: 1 }, { opacity: 0 });
                    t1.fromTo(".slide", 1, { x: "-100%" }, { x: "0%", onComplete: done });
                },
       
                enter({ current, next }) {
                    window.scrollTo(0, 0);
                    let done = this.async();
                    const t2 = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                    t2.fromTo(".slide", 1, { x: "0%" }, { x: "100%", onComplete: done });
                    t2.fromTo(next.container, 0.5, { opacity: 0 }, { opacity: 1 });
               
                }
            }
        ]

    });

});


function openBurger() {
    burger.classList.toggle("active");
    if (burger.classList.contains("active")) {
        document.body.classList.add("hide");
        gsap.to(".line1", 1, { rotate: "45", y: "3", backgroundColor: "black" });
        gsap.to(".line2", 1, { rotate: "-45",y: "-3",  backgroundColor: "black" });
        gsap.to(".header ul", 1, { clipPath: "circle(2500px at 100% -10%)" });
    } else {
        document.body.classList.remove("hide");
        gsap.to(".line1", 1, { rotate: "0", y: "0", backgroundColor: "white" });
        gsap.to(".line2", 1, { rotate: "0", y: "0", backgroundColor: "white" });
        gsap.to(".header ul", 1, { clipPath: "circle(50px at 100% -10%)" });
    }
}

//Event Listners

window.addEventListener("mousemove", cursorAnimation);
window.addEventListener("mouseover", cursorActive);
burger.addEventListener("click", openBurger);




