import React from 'react';
import Image from 'next/image';
import styles from './userIcon.module.css';

const UserIcon = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.userProfile}>
                    <Image 
                        src="/images/usericon.svg" 
                        alt="User Icon"
                        width={75}
                        height={74}
                        className={styles.icon}
                    />
                    <div className={styles.additionalInfo}>
                        <div>Welcome Anna</div>
                        <div>Team HR</div>
                    </div>
                </div>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            <div>
                                <Image 
                                    src="/images/dashboard.svg"
                                    alt="Dashboard Icon"
                                    width={20}
                                    height={20}
                                    className={styles.iconsecond}
                                />
                                Dashboard
                            </div>
                        </li>
                        <li>
                            <div className={styles.iconlast}>
                                <span>
                                    <Image 
                                        src="/images/settings.svg" 
                                        alt="Settings Icon"
                                        width={20}
                                        height={20}
                                    />
                                </span>
                                Settings
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserIcon;
