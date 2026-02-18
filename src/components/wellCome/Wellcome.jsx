


import { useRef, useState } from "react"
import styles from "./Wellcome.module.css"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import profileImage from "../../../public/1.png"
const Welcome = () => {
  const pdfRef = useRef()
  const [isDownloading, setIsDownloading] = useState(false)

  // const downloadPDF = async () => {
  //   if (!pdfRef.current) return

  //   setIsDownloading(true)
  //   const element = pdfRef.current
  //   element.classList.add(styles.pdfMode)

  //   try {
  //     const canvas = await html2canvas(element, {
  //       scale: 3,
  //       backgroundColor: "#ffffff",
  //       useCORS: true,
  //       allowTaint: true,
  //       logging: false,
  //       windowHeight: element.scrollHeight,
  //     })

  //     element.classList.remove(styles.pdfMode)

  //     const imgData = canvas.toDataURL("image/png")
  //     const pdf = new jsPDF({
  //       orientation: "p",
  //       unit: "mm",
  //       format: "a4",
  //     })

  //     const pdfWidth = pdf.internal.pageSize.getWidth()
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  //     let heightLeft = pdfHeight
  //     let position = 0

  //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
  //     heightLeft -= pdf.internal.pageSize.getHeight()

  //     while (heightLeft >= 0) {
  //       position = heightLeft - pdfHeight
  //       pdf.addPage()
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
  //       heightLeft -= pdf.internal.pageSize.getHeight()
  //     }

  //     pdf.save("Saurabh_Singh_Portfolio.pdf")
  //   } catch (error) {
  //     console.error("PDF generation failed:", error)
  //   } finally {
  //     element.classList.remove(styles.pdfMode)
  //     setIsDownloading(false)
  //   }
  // }

  const downloadPDF = async () => {
  if (!pdfRef.current) return

  setIsDownloading(true)
  const element = pdfRef.current

  // Disable animations & effects for PDF
  element.classList.add(styles.pdfMode)

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = 210
    const pdfHeight = 297

    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    pdf.save("Saurabh_Singh_Portfolio.pdf")
  } catch (err) {
    console.error(err)
  } finally {
    element.classList.remove(styles.pdfMode)
    setIsDownloading(false)
  }
    
}



  const skills = {

  frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 88 },
    { name: "JavaScript (ES6+)", level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 90 },
  ],
  mobile: [
    { name: "React Native", level: 88 },
    { name: "Expo", level: 85 },
    { name: "Android APK Build", level: 80 },
  ],
  backend: [
    { name: "Node.js & Express", level: 82 },
    { name: "MySQL", level: 78 },
    { name: "REST APIs", level: 85 },
    { name: "Git & GitHub", level: 90 },
  ],
  tools: [
    { name: "GitHub", level: 90 },
    { name: "Postman", level: 85 },
    { name: "Clerk Auth", level: 80 },
    { name: "Neon DB", level: 78 },
    { name: "Drizzle ORM", level: 80 },
  ],
};

  const projects = [
    {
      title: "Bookstore App",
      description: "Full-featured e-commerce bookstore with shopping cart, checkout flow, and user authentication.",
      tech: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://bookstore-frontend-green.vercel.app/",
    },
    {
      title: "My Finance App",
      description: "Personal finance tracking application with expense analytics and budget management.",
      tech: ["React", "Chart.js", "Firebase"],
      liveUrl: "https://siddhi-finance.vercel.app/",
    },
    {
      title: "FreshlyNow (Android)",
      description: "FreshlyNow is a high-performance, ultra-fast grocery delivery platform designed to bring daily essentials to your doorstep in minutes. Leveraging a React Native frontend and Redux Toolkit for lightning-fast state management, the app delivers a frictionless shopping experience.",
      tech: ["React Native", "Expo", "EAS Build"],
      liveUrl: "https://expo.dev/accounts/100rabh_07/projects/freshlynow/builds/f7f77458-134e-4ad8-b617-5d7ab0aa7b72",
      isApk: true,
    },
    {
      title: "Social Media Platform",
      description: "Full-stack social networking platform with posts, likes, comments, and real-time chat.",
      tech: ["React", "Node.js", "MySQL"],
    },
    {
      title: "Myntra Clone",
      description: "E-commerce frontend clone with product catalog, filters, and cart functionality.",
      tech: ["React", "Redux", "CSS"],
      liveUrl: "https://clone-client-myntra.vercel.app/",
    },
    // {
    //   title: "To-Do Mobile App",
    //   description: "Cross-platform task management app with categories and reminders.",
    //   tech: ["React Native", "AsyncStorage"],
    // },
  ]

  return (
    <div className={styles.container}>
      {/* Floating Orbs Background */}
      <div className={styles.orbsContainer}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
        <div className={`${styles.orb} ${styles.orb4}`}></div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div ref={pdfRef} className={styles.pdfArea}>
          {/* Hero Header */}
          <header className={styles.header}>
            <div className={styles.profileWrapper}>
              <div className={styles.profileGlow}></div>
              <img
                src={profileImage}
                alt="Saurabh Singh"
                className={styles.profileImage}
                crossOrigin="anonymous"
              />
              <span className={styles.sparkle}>✨</span>
            </div>
            <div className={styles.headerInfo}>
              <h1 className={styles.name}>Saurabh Singh</h1>
              <p className={styles.jobTitle}>Frontend & Mobile App Developer</p>
              <div className={styles.badges}>
                <span className={styles.badgePrimary}>React.js Expert</span>
                <span className={styles.badgeAccent}>React Native</span>
                <span className={styles.badgeMuted}>Full Stack</span>
              </div>
            </div>
          </header>

          {/* About Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p className={styles.sectionSubtitle}>Passionate developer creating impactful digital experiences</p>
              <div className={styles.sectionLine}></div>
            </div>
            <p className={styles.paragraph}>
              Passionate Frontend and Mobile App Developer with expertise in{" "}
              <strong className={styles.highlight}>React.js, Next.js, and React Native</strong>. I specialize in
              building responsive web applications and cross-platform mobile apps that deliver exceptional user
              experiences. Experienced in generating{" "}
              <strong className={styles.highlightAccent}>Android APKs using Expo EAS</strong> and deploying
              production-ready applications that scale.
            </p>
          </section>

          {/* Skills Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Technical Skills</h2>
              <p className={styles.sectionSubtitle}>Technologies I work with daily</p>
              <div className={styles.sectionLine}></div>
            </div>
            <div className={styles.skillsGrid}>
              {/* Frontend Skills */}
              <div className={styles.skillCategory}>
                <div className={styles.skillCategoryHeader}>
                  <span className={styles.skillIcon}>💻</span>
                  <h3>Frontend</h3>
                </div>
                {skills.frontend.map((skill, i) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span>{skill.name}</span>
                      <span className={styles.skillPercent}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillProgress}
                        style={{ width: `${skill.level}%`, animationDelay: `${i * 0.1}s` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Skills */}
              <div className={styles.skillCategory}>
                <div className={styles.skillCategoryHeader}>
                  <span className={styles.skillIcon}>📱</span>
                  <h3>Mobile</h3>
                </div>
                {skills.mobile.map((skill, i) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span>{skill.name}</span>
                      <span className={styles.skillPercent}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={`${styles.skillProgress} ${styles.skillProgressAccent}`}
                        style={{ width: `${skill.level}%`, animationDelay: `${i * 0.1 + 0.5}s` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Backend Skills */}
              <div className={styles.skillCategory}>
                <div className={styles.skillCategoryHeader}>
                  <span className={styles.skillIcon}>⚙️</span>
                  <h3>Backend & Tools</h3>
                </div>
                {skills.backend.map((skill, i) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span>{skill.name}</span>
                      <span className={styles.skillPercent}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={`${styles.skillProgress} ${styles.skillProgressMuted}`}
                        style={{ width: `${skill.level}%`, animationDelay: `${i * 0.1 + 1}s` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.skillCategory}>
  <div className={styles.skillCategoryHeader}>
    <span className={styles.skillIcon}>🧰</span>
    <h3>Tools</h3>
  </div>

  {skills.tools.map((skill, i) => (
    <div key={skill.name} className={styles.skillItem}>
      <div className={styles.skillInfo}>
        <span>{skill.name}</span>
        <span className={styles.skillPercent}>{skill.level}%</span>
      </div>
      <div className={styles.skillBar}>
        <div
          className={`${styles.skillProgress} ${styles.skillProgressMuted}`}
          style={{ width: `${skill.level}%`, animationDelay: `${i * 0.1 + 1.5}s` }}
        ></div>
      </div>
    </div>
  ))}
</div>
            </div>
          </section>

          {/* Projects Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured Projects</h2>
              <p className={styles.sectionSubtitle}>Some of my recent work</p>
              <div className={styles.sectionLine}></div>
            </div>
            <div className={styles.projectsGrid}>
              {projects.map((project, i) => (
                <div key={project.title} className={styles.projectCard} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={styles.projectHeader}>
                    <h3>{project.title}</h3>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        {project.isApk ? "📱" : "🔗"}
                      </a>
                    )}
                  </div>
                  <p className={styles.projectDesc}>{project.description}</p>
                  <div className={styles.techTags}>
                    {project.tech.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Get In Touch</h2>
              <p className={styles.sectionSubtitle}>Let's build something amazing together</p>
              <div className={styles.sectionLine}></div>
            </div>
            <div className={styles.contactGrid}>
              <a href="mailto:saurabh123mahi@gmail.com" className={styles.contactCard}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <p className={styles.contactLabel}>Email</p>
                  <p className={styles.contactValue}>saurabh123mahi@gmail.com</p>
                </div>
              </a>
              <a
                href="https://github.com/Saurabh63948"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactCard}
              >
                <span className={styles.contactIcon}>💻</span>
                <div>
                  <p className={styles.contactLabel}>GitHub</p>
                  <p className={styles.contactValue}>github.com/Saurabh63948</p>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/singh-saurabh07"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactCard}
              >
                <span className={styles.contactIcon}>💼</span>
                <div>
                  <p className={styles.contactLabel}>LinkedIn</p>
                  <p className={styles.contactValue}>linkedin.com/in/singh-saurabh07</p>
                </div>
              </a>
               <a
                href="https://linkedin.com/in/singh-saurabh07"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactCard}
              >
                <span className={styles.contactIcon}>Apk Password</span>
                <div>
                  <p className={styles.contactLabel}>saurabh123mahi@gmail.com</p>
                  <p className={styles.contactValue}>12345</p>
                </div>
              </a>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.downloadBtn} onClick={downloadPDF} disabled={isDownloading}>
            <span className={styles.btnIcon}>📄</span>
            {isDownloading ? "Generating PDF..." : "Download Resume PDF"}
            <span className={styles.btnArrow}>→</span>
          </button>

          <a
            href="https://expo.dev/accounts/100rabh_07/projects/freshlynow/builds/f7f77458-134e-4ad8-b617-5d7ab0aa7b72"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.apkBtn}
          >
            <span className={styles.btnIcon}>📱</span>
            Download Android APK
          </a>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2026 Saurabh Singh. Built with passion and React.</p>
        </footer>
      </div>
    </div>
  )
}

export default Welcome
