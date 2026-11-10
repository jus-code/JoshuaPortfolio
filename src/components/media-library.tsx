import { Arrow } from "./arrow";

const MEDIA_LIBRARY_URL = "https://drive.google.com/drive/u/2/folders/1KzMZ-keO8sH5M0Bot1s2NKUYYr0XcPj-";

export function MediaLibrary() {
  return (
    <section className="media-library section-space" aria-labelledby="media-library-title">
      <div className="section-shell">
        <div className="section-label metadata" data-reveal><span>02 / Media library</span><span>Full project archive on Google Drive</span></div>
        <div className="media-library-inner" data-reveal>
          <h2 id="media-library-title" className="display">MEDIA<br /><span className="outline-type">LIBRARY.</span></h2>
          <div className="media-library-copy">
            <p>Browse the full archive — raw footage, project files, posters and design exports in one Google Drive folder.</p>
            <a className="text-link" href={MEDIA_LIBRARY_URL} target="_blank" rel="noopener noreferrer" aria-label="Go to the media library on Google Drive (opens in a new tab)" data-magnetic>Go to media library <Arrow diagonal /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
