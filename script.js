document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector("nav")
  const newsletterForm = document.getElementById("newsletter-form")

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    const isDarkMode = body.classList.contains("dark-mode")
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
    localStorage.setItem("darkMode", isDarkMode)
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("darkMode")
  if (savedTheme === "true") {
    body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("mobile-menu-active")
    mobileMenuToggle.setAttribute("aria-expanded", nav.classList.contains("mobile-menu-active"))
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && nav.classList.contains("mobile-menu-active")) {
      nav.classList.remove("mobile-menu-active")
      mobileMenuToggle.setAttribute("aria-expanded", "false")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Newsletter form submission
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = newsletterForm.querySelector('input[type="email"]').value
    alert(`Thank you for subscribing with email: ${email}`)
    newsletterForm.reset()
  })

  // Intersection Observer for animations
  const animatedElements = document.querySelectorAll(".feature-item, .testimonial-item, .pricing-item")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out"
    observer.observe(el)
  })
})

