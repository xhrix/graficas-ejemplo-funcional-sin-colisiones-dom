import * as React from 'react';
import * as styles from './header.scss';

const Header = ({title}: { title: string }) => <header className={styles.container}>
    <span>{title}</span>
</header>;

export default Header;