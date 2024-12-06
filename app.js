// book consult

// Toggle menu for mobile view
function toggleMenu() {
    const menu = document.querySelector('ul');
    const toggleButton = document.querySelector('.navbar-toggle');
    toggleButton.classList.toggle('active');
    menu.classList.toggle('active');
}



// CTA
document.querySelector(".bg-primary-lightgreencolor").addEventListener("click", function () {
  document.querySelector("form").scrollIntoView({ behavior: "smooth" });
});


     // for smooth scrolling
    document.querySelectorAll('#home').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

       document.querySelectorAll('#home').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });


       document.querySelectorAll('#services').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

      
       document.querySelectorAll('#portfolio').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    document.querySelectorAll('#review').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  document.querySelectorAll('#contact').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});



    



