import React from 'react';
import ContentLoader from 'react-content-loader';


const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={289}
    height={465}
    viewBox="0 0 289 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="129" cy="118" r="111" />
    <circle cx="173" cy="125" r="11" />
    <rect x="8" y="252" rx="11" ry="11" width="255" height="35" />
    <rect x="6" y="306" rx="0" ry="0" width="260" height="76" />
    <rect x="2" y="389" rx="11" ry="11" width="88" height="38" />
    <rect x="127" y="394" rx="7" ry="7" width="137" height="44" />
  </ContentLoader>
);

export default Skeleton;
