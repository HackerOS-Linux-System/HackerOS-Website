window.HACKEROS_DOWNLOAD_EDITIONS = [
    {
        id: 'official',
        docsKey: 'official',
        name: 'HackerOS Official',
        img: 'official-edition.png',
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/OFFICIAL/HackerOS-V4.9.iso/download',
            mega:     'https://mega.nz/file/8ftCRYQa#jIIOe8db_gPtGroe68QdsF5-3wfiudxhcQUff0wv99w',
            drive:    'https://drive.google.com/file/d/1aX7N1_bDpzWCVBictAP8OyhBQk5doa1X/view?usp=sharing',
            transfer: 'https://transfer.it/t/snqZUH0VnTqL',
            actions:  'https://github.com/HackerOS-Linux-System/HackerOS/actions/runs/31165869861/artifacts/8989604188'
        }
    },
    {
        id: 'nvidia',
        docsKey: 'nvidia',
        name: 'HackerOS NVIDIA',
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/NVIDIA/HackerOS-V4.9-NVIDIA.iso/download',
            mega:     'https://mega.nz/file/0XNGESLD#QNzrTswUsmUUCBM6Ua4hBQ7R2Vg1PyAgiEV04BHgIwU',
            drive:    'https://drive.google.com/file/d/1CU6Lc2XoCmVqPx6OwV046WaxN9DiHcW4/view?usp=sharing',
            transfer: 'https://transfer.it/t/m5ubFetnhJSI',
            actions:  'https://github.com/HackerOS-Linux-System/HackerOS/actions/runs/31165869861/artifacts/8989674334'
        }
    },
    {
        id: 'cybersecurity',
        docsKey: 'cybersec',
        name: 'HackerOS Cybersecurity',
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/CYBERSECURITY/HackerOS-V4.9-Cybersecurity.iso/download',
            mega:     'https://mega.nz/file/UCVn3T7Y#OCT69qU6O8V7GxoyK__5T3jkHouLhLRB_0ZyMF6rWWo',
            drive:    'https://drive.google.com/file/d/1q6ToTXs9K0Ce4TykLwlSw0-MREO7bnfb/view?usp=sharing',
            transfer: 'https://transfer.it/t/ArXx0GtTVbCK',
            actions:  'https://github.com/HackerOS-Linux-System/HackerOS/actions/runs/31165869861/artifacts/8989694184'
        }
    },
    {
        id: 'cybersecurity-default',
        docsKey: 'cybersecdefault',
        name: 'HackerOS Cybersecurity Default',
        img: 'cybersecurity-default-edition.png',
        excluded: ['mega', 'transfer'],
        links: {
            sf:       null,
            mega:     null,
            drive:    null,
            transfer: null,
            actions:  null
        }
    },
    {
        id: 'gnome',
        docsKey: 'gnome',
        name: 'HackerOS Official: Gnome',
        img: 'gnome-edition.png',
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/OFFICIAL/GNOME/HackerOS-V4.5-Gnome.iso/download',
            mega:     'https://mega.nz/file/dbVhHA4b#XX_gWHN4leztjswMtl68xYZ9m4R4tYbwd0atSqQ-mDE',
            drive:    'https://drive.google.com/file/d/1_oz4vywV-L5FuGE_t-b-PcFTcmtpeKd3/view?usp=sharing',
            transfer: 'https://transfer.it/t/ZjwA5f1lzbjS',
            actions:  null
        }
    },
    {
        id: 'hydra',
        docsKey: 'hydra',
        name: 'HackerOS Official: Hydra',
        img: 'hydra-edition.png',
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/OFFICIAL/HYDRA/HackerOS-V4.5-Hydra.iso/download',
            mega:     'https://mega.nz/file/ITUQQL5Z#t5vDdYxOiOqgU1bS3BJboKlnX7N1OwKFV3-LE6Srg9s',
            drive:    'https://drive.google.com/file/d/1jxQLxomUzD8t9jHjnoB3pU2XnpTrdqOG/view?usp=sharing',
            transfer: 'https://transfer.it/t/LEeOtbsFmRIT',
            actions:  null
        }
    },
    {
        id: 'xfce',
        docsKey: 'xfce',
        name: 'HackerOS Official: Xfce',
        img: 'xfce-edition.png',
        excluded: ['mega', 'transfer'],
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/OFFICIAL/XFCE/HackerOS-V4.5-Xfce.iso/download',
            mega:     null,
            drive:    'https://drive.google.com/file/d/1g3mYZIVHZ7L_see5aR29mgjLOQBhgoaq/view?usp=sharing',
            transfer: null,
            actions:  null
        }
    },
    {
        id: 'blue',
        docsKey: 'blue',
        name: 'HackerOS Blue',
        img: 'blue-edition.png',
        excluded: ['drive', 'mega', 'transfer'],
        links: {
            sf:       null,
            mega:     null,
            drive:    null,
            transfer: null,
            actions:  null
        }
    },
    {
        id: 'hwde',
        docsKey: 'hwde',
        name: 'HackerOS HWDE',
        img: 'hwde-edition.png',
        excluded: ['mega', 'transfer', 'drive'],
        links: {
            sf:       null,
            mega:     null,
            drive:    null,
            transfer: null,
            actions:  null
        }
    },
    {
        id: 'gaming',
        docsKey: 'gaming',
        name: 'HackerOS Gaming',
        img: 'gaming-edition.png',
        excluded: ['mega', 'transfer', 'drive'],
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/GAMING/HackerOS-V4.7-Gaming.iso/download',
            mega:     null,
            drive:    null,
            transfer: null,
            actions:  null
        }
    },
    {
        id: 'lts',
        docsKey: 'lts',
        name: 'HackerOS LTS',
        excluded: ['mega', 'transfer'],
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/LTS/HackerOS-V4.1-LTS.iso/download',
            mega:     null,
            drive:    'https://drive.google.com/file/d/1Kc-L3gFuXP7Vw-r-kVWgSscxDm5GW0QX/view?usp=sharing',
            transfer: null,
            actions:  null
        }
    },
    {
        id: 'atomic',
        docsKey: 'atomic',
        name: 'HackerOS Atomic',
        excluded: ['mega', 'transfer'],
        links: {
            sf:       'https://sourceforge.net/projects/hackeros/files/ATOMIC/HackerOS-Atomic-Testing-DEV-V4.9.iso/download',
            mega:     null,
            drive:    'https://drive.google.com/file/d/1qizajIMGKG8_N5EtOuzD2IQndfjDSUV_/view?usp=sharing',
            transfer: null,
            actions:  'https://github.com/HackerOS-Linux-System/HackerOS/actions/runs/31167851135/artifacts/8990275885'
        }
    }
];
