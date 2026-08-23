const ADDRESS = "sujatk891@gmail.com";
const SUBJECT = "Hello Sujat!";
const BODY = "Hi Sujat,";

const q = encodeURIComponent;

/* Always the href, so the link is a real mail link: middle-click, copy-link and
   right-click all behave, and it is what runs if JS never loads. */
export const MAILTO_HREF = `mailto:${ADDRESS}?subject=${q(SUBJECT)}&body=${q(BODY)}`;

/* Gmail's compose view, pre-addressed with the same subject and body. */
const GMAIL_HREF =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${q(ADDRESS)}&su=${q(SUBJECT)}&body=${q(BODY)}`;

/* Desktop machines frequently have no mail client registered for mailto:, so
   the link silently does nothing. Send those to Gmail in a new tab instead.
   Touch devices keep mailto: — there it hands off to the installed mail app,
   which is the better experience. */
export const onMailClick = (e) => {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  e.preventDefault();
  window.open(GMAIL_HREF, "_blank", "noopener,noreferrer");
};
