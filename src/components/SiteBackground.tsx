export default function SiteBackground() {
  return (
    <>
      <div className="site-bg" aria-hidden="true">
        <div className="site-bg__speckle" />
      </div>
      <div className="site-glow" aria-hidden="true" />
      <div className="site-glass" aria-hidden="true">
        <div className="site-glass__light" />
        <div className="site-glass__flutes" />
      </div>
    </>
  );
}
