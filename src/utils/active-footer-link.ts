export function activeFooterLink(path: string) {
  const footerLinks = document.querySelectorAll('.app-footer-nav a');
  footerLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}