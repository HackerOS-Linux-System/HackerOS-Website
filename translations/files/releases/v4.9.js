(function () {
    const V49 = {
        de: {
            version: 'HackerOS V4.9',
            desc: 'Neue Edition mit zahlreichen Verbesserungen.',
            dates: [
                'HackerOS Official: 7.08.2026',
                'HackerOS Cybersecurity: 7.08.2026',
                'HackerOS NVIDIA: 7.08.2026',
            ],
            changelog: [
                'Bootloader-Hintergrund im Live-Modus aktualisiert und erweitert.',
                'Eigenes Plymouth-Theme hinzugefügt.',
                'Hacker Lang aktualisiert.',
                'Hacker Launcher aktualisiert.',
                'HackerOS Store aktualisiert und erweitert.',
                'Vollständige Umstellung des ISO-Image-Builds von lokal auf GitHub Actions — ISO-Images werden jetzt in GitHub Actions gebaut.',
            ]
        },
        fr: {
            version: 'HackerOS V4.9',
            desc: 'Nouvelle édition avec de nombreuses améliorations.',
            dates: [
                'HackerOS Official : 7.08.2026',
                'HackerOS Cybersecurity : 7.08.2026',
                'HackerOS NVIDIA : 7.08.2026',
            ],
            changelog: [
                'Mise à jour et enrichissement de l\'arrière-plan du bootloader en mode live.',
                'Ajout d\'un thème Plymouth personnalisé.',
                'Mise à jour de Hacker Lang.',
                'Mise à jour de Hacker Launcher.',
                'Mise à jour et enrichissement de HackerOS Store.',
                'Migration complète de la construction des images ISO, du build local vers GitHub Actions — les images ISO sont désormais construites via GitHub Actions.',
            ]
        },
        es: {
            version: 'HackerOS V4.9',
            desc: 'Nueva edición con numerosas mejoras.',
            dates: [
                'HackerOS Official: 7.08.2026',
                'HackerOS Cybersecurity: 7.08.2026',
                'HackerOS NVIDIA: 7.08.2026',
            ],
            changelog: [
                'Actualizado y ampliado el fondo del bootloader en modo live.',
                'Añadido un tema Plymouth propio.',
                'Actualizado Hacker Lang.',
                'Actualizado Hacker Launcher.',
                'Actualizado y ampliado HackerOS Store.',
                'Migración completa de la construcción de imágenes ISO de local a GitHub Actions — las imágenes ISO ahora se construyen en GitHub Actions.',
            ]
        },
        it: {
            version: 'HackerOS V4.9',
            desc: 'Nuova edizione con numerosi miglioramenti.',
            dates: [
                'HackerOS Official: 7.08.2026',
                'HackerOS Cybersecurity: 7.08.2026',
                'HackerOS NVIDIA: 7.08.2026',
            ],
            changelog: [
                'Aggiornato ed esteso lo sfondo del bootloader in modalità live.',
                'Aggiunto un tema Plymouth personalizzato.',
                'Aggiornato Hacker Lang.',
                'Aggiornato Hacker Launcher.',
                'Aggiornato ed esteso HackerOS Store.',
                'Migrazione completa della build delle immagini ISO da locale a GitHub Actions — le immagini ISO sono ora generate su GitHub Actions.',
            ]
        },
        ru: {
            version: 'HackerOS V4.9',
            desc: 'Новая версия с многочисленными улучшениями.',
            dates: [
                'HackerOS Official: 7.08.2026',
                'HackerOS Cybersecurity: 7.08.2026',
                'HackerOS NVIDIA: 7.08.2026',
            ],
            changelog: [
                'Обновлён и расширен фон загрузчика в live-режиме.',
                'Добавлена собственная тема Plymouth.',
                'Обновлён Hacker Lang.',
                'Обновлён Hacker Launcher.',
                'Обновлён и расширен HackerOS Store.',
                'Полный перенос сборки ISO-образов с локальной на GitHub Actions — теперь ISO-образы собираются в GitHub Actions.',
            ]
        },
        uk: {
            version: 'HackerOS V4.9',
            desc: 'Нове видання з численними покращеннями.',
            dates: [
                'HackerOS Official: 7.08.2026',
                'HackerOS Cybersecurity: 7.08.2026',
                'HackerOS NVIDIA: 7.08.2026',
            ],
            changelog: [
                'Оновлено та розширено фон завантажувача в live-режимі.',
                'Додано власну тему Plymouth.',
                'Оновлено Hacker Lang.',
                'Оновлено Hacker Launcher.',
                'Оновлено та розширено HackerOS Store.',
                'Повне перенесення збірки ISO-образів з локальної на GitHub Actions — ISO-образи тепер збираються в GitHub Actions.',
            ]
        },
        zh: {
            version: 'HackerOS V4.9',
            desc: '带来众多改进的新版本。',
            dates: [
                'HackerOS Official：2026年8月7日',
                'HackerOS Cybersecurity：2026年8月7日',
                'HackerOS NVIDIA：2026年8月7日',
            ],
            changelog: [
                '更新并扩展了 Live 模式下的引导程序背景。',
                '新增了自定义 Plymouth 主题。',
                '更新了 Hacker Lang。',
                '更新了 Hacker Launcher。',
                '更新并扩展了 HackerOS Store。',
                '将 ISO 镜像构建完全从本地构建迁移到 GitHub Actions —— 现在 ISO 镜像在 GitHub Actions 中构建。',
            ]
        },
        ja: {
            version: 'HackerOS V4.9',
            desc: '数多くの改善を含む新しいエディション。',
            dates: [
                'HackerOS Official: 2026年8月7日',
                'HackerOS Cybersecurity: 2026年8月7日',
                'HackerOS NVIDIA: 2026年8月7日',
            ],
            changelog: [
                'ライブモードのブートローダー背景を更新・拡張しました。',
                '独自の Plymouth テーマを追加しました。',
                'Hacker Lang を更新しました。',
                'Hacker Launcher を更新しました。',
                'HackerOS Store を更新・拡張しました。',
                'ISOイメージのビルドをローカルビルドから GitHub Actions へ完全移行しました。ISOイメージは今後 GitHub Actions 上でビルドされます。',
            ]
        }
    };

    if (!window.HACKEROS_TRANS_RELEASES) return;

    Object.keys(V49).forEach(function (lang) {
        const bucket = window.HACKEROS_TRANS_RELEASES[lang];
        if (!bucket || !Array.isArray(bucket.releases)) return;
        // Build a NEW array so we never mutate the shared (inherited-from-en) array reference.
        bucket.releases = [V49[lang]].concat(bucket.releases);
    });
})();
