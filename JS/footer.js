const footer = `<div class="container">
            <div class="info">
                <div class="about">
                    <p>About us</p>
                    <p>Cookie Policy</p>
                    <p>Advertise With Us</p>
                </div>
                <div class="about">
                    <p>FAQs</p>
                    <p>Privacy Policy</p>
                    <p>Acceptable Use Policy</p>
                </div>
                <div class="about">
                    <p>Careers</p>
                    <p>Become A Brand Partner</p>
                    <p>Terms And Conditions</p>
                </div>
                <div class="contact">
                    <p>Contact Us On Whatsapp</p>
                    <div class="contact-container">
                        <img src="images/whatsappIcon.svg" alt="whatsapp">
                        <span>+971 52 368 2471</span>
                    </div>
                </div>
                <div class="subscribe">
                    <p>Subscribe to our newsletter and be the first to know about our updates</p>
                    <div class="input">
                        <input type="email" placeholder="Email Address">
                        <button>Subscribe</button>      
                    </div>
                </div>
            </div>
            <p class="title-footer">Get Our App now</p>
            <div class="images">
                <img src="images/googlePlay.svg" alt="google play">
                <img src="images/appStore.svg" alt="app store">
            </div>
        </div>`

document.querySelector('.footer').innerHTML = footer;