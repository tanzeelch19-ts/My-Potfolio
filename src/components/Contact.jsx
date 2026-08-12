import { useState } from "react";
import { Mail, Phone, MapPin, Download, Send, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Section from "./Section.jsx";
import { SOCIALS } from "../data/data.js";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxxxx"; // replace with your ID

function ContactRow({ icon, label, href }) {
  const content = (
    <div className="group flex items-center gap-3 p-3 rounded-lg glass hover-lift">
      <span className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center text-amber shrink-0 transition-colors group-hover:bg-amber/20">
        {icon}
      </span>
      <span className="text-sm text-ink-900 dark:text-paper truncate transition-colors group-hover:text-amber">
        {label}
      </span>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  ) : (
    content
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState(null); // null | "error" | "sending" | "sent" | "failed"
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const errors = {};
    if (!name) errors.name = true;
    if (!email) errors.email = true;
    if (!message) errors.message = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormStatus("error");
      return;
    }

    setFieldErrors({});
    setFormStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setFormStatus("sent");
        form.reset();
      } else {
        setFormStatus("failed");
      }
    } catch {
      setFormStatus("failed");
    }
  };

  const inputClass = (field) =>
    `font-mono w-full px-3 py-2.5 rounded-md text-sm outline-none bg-paper dark:bg-ink-700 border transition-colors ${
      fieldErrors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-paper-line dark:border-ink-line focus:border-amber"
    } text-ink-900 dark:text-paper`;

  return (
    <Section id="contact" eyebrow="07" title="Contact">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <ContactRow
            icon={<Mail size={16} />}
            label={SOCIALS.email}
            href={`mailto:${SOCIALS.email}`}
          />
          <ContactRow
            icon={<Phone size={16} />}
            label={SOCIALS.phone}
            href={`tel:${SOCIALS.phone.replace(/\s/g, "")}`}
          />
          <ContactRow icon={<MapPin size={16} />} label="Bahawalpur, Punjab, Pakistan" />
          <ContactRow
            icon={<FaGithub size={16} />}
            label="github.com/tanzeelch19-ts"
            href={SOCIALS.github}
          />
          <ContactRow icon={<FaLinkedin size={16} />} label="LinkedIn" href={SOCIALS.linkedin} />
<a
          
            href="/resume.pdf"
            className="font-mono text-sm inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-md border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber hover:text-amber transition-colors"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg p-5 glass hover-lift">
          <p className="font-mono text-xs mb-4 text-gray-500 dark:text-gray-400">
            <span className="text-amber">$</span> send --message
          </p>
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Your name"
              className={inputClass("name")}
              onChange={() => setFieldErrors((f) => ({ ...f, name: false }))}
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className={inputClass("email")}
              onChange={() => setFieldErrors((f) => ({ ...f, email: false }))}
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={4}
              className={`${inputClass("message")} resize-none`}
              onChange={() => setFieldErrors((f) => ({ ...f, message: false }))}
            />

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium bg-amber text-ink-900 hover:bg-amber-bright transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus === "sent" ? (
                <>
                  Sent <Check size={15} />
                </>
              ) : formStatus === "sending" ? (
                "Sending…"
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>

            {formStatus === "error" && (
              <p className="text-xs text-red-500">
                Please fill in the highlighted field{Object.keys(fieldErrors).length > 1 ? "s" : ""}.
              </p>
            )}
            {formStatus === "sent" && (
              <p className="text-xs text-amber">
                Message sent — I'll get back to you soon.
              </p>
            )}
            {formStatus === "failed" && (
              <p className="text-xs text-red-500">
                Something went wrong. Please email me directly instead.
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}