// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
          top: target.offsetTop - 50,
          behavior: 'smooth'
      });
  });
});

// FAQ toggle functionality
const faqs = document.querySelectorAll('.faq h3');

faqs.forEach(faq => {
  faq.addEventListener('click', () => {
      const content = faq.nextElementSibling;
      const icon = faq.querySelector('i');
      
      if (content.style.display === 'block') {
          content.style.display = 'none';
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
      } else {
          content.style.display = 'block';
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
      }
  });
});
