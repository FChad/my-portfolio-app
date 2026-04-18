export const BIRTH_DATE = '1999-08-03'

export interface ProfileInfoItem {
    icon: string
    labelKey: string
    valueKey: string
}

export const profileInfoItems: ProfileInfoItem[] = [
    { icon: 'mdi:map-marker', labelKey: 'about.profile.labels.location', valueKey: 'about.profile.location' },
    { icon: 'mdi:flag', labelKey: 'about.profile.labels.nationality', valueKey: 'about.profile.nationality' },
    { icon: 'mdi:heart', labelKey: 'about.profile.labels.status', valueKey: 'about.profile.status' },
    { icon: 'mdi:car', labelKey: 'about.profile.labels.license', valueKey: 'about.profile.driving' }
]

export interface CertificationItem {
    titleKey: string
    year: string
    descriptionKey: string
    icon: string
}

export const certificationItems: CertificationItem[] = [
    { titleKey: 'about.certificationsList.cert1.title', year: '2023', descriptionKey: 'about.certificationsList.cert1.description', icon: 'mdi:school' },
    { titleKey: 'about.certificationsList.cert2.title', year: '2021', descriptionKey: 'about.certificationsList.cert2.description', icon: 'mdi:shield-check' },
    { titleKey: 'about.certificationsList.cert3.title', year: '2021', descriptionKey: 'about.certificationsList.cert3.description', icon: 'mdi:lan' },
    { titleKey: 'about.certificationsList.cert4.title', year: '2020', descriptionKey: 'about.certificationsList.cert4.description', icon: 'mdi:lan' },
    { titleKey: 'about.certificationsList.cert5.title', year: '2020', descriptionKey: 'about.certificationsList.cert5.description', icon: 'mdi:lan' },
    { titleKey: 'about.certificationsList.cert6.title', year: '2020', descriptionKey: 'about.certificationsList.cert6.description', icon: 'mdi:file-document' }
]

export interface TimelineItemData {
    year: string
    category: 'work' | 'education'
    titleKey: string
    descriptionKey: string
    companyKey?: string
    typeKey?: string
    taskKeys?: string[]
    schoolKey?: string
    gradeKey?: string
    link?: string
    linkLabelKey?: string
}

export const timelineItems: TimelineItemData[] = [
    {
        year: '2024', category: 'work',
        titleKey: 'about.timelineItems.item1.title',
        descriptionKey: 'about.timelineItems.item1.description',
        companyKey: 'about.timelineItems.item1.company',
        typeKey: 'about.timelineItems.item1.type',
        taskKeys: [
            'about.timelineItems.item1.task1',
            'about.timelineItems.item1.task2',
            'about.timelineItems.item1.task3',
            'about.timelineItems.item1.task4',
            'about.timelineItems.item1.task5'
        ]
    },
    {
        year: '2021', category: 'education',
        titleKey: 'about.education.bts.degree',
        descriptionKey: 'about.education.bts.field',
        schoolKey: 'about.education.bts.school',
        gradeKey: 'about.education.bts.grade',
        link: 'https://www.lgk.lu/bts/clc/',
        linkLabelKey: 'about.education.links.bts'
    },
    {
        year: '2021', category: 'work',
        titleKey: 'about.timelineItems.item2.title',
        descriptionKey: 'about.timelineItems.item2.description',
        companyKey: 'about.timelineItems.item2.company',
        typeKey: 'about.timelineItems.item2.type',
        taskKeys: [
            'about.timelineItems.item2.task1',
            'about.timelineItems.item2.task2',
            'about.timelineItems.item2.task3',
            'about.timelineItems.item2.task4',
            'about.timelineItems.item2.task5',
            'about.timelineItems.item2.task6'
        ]
    },
    {
        year: '2020', category: 'work',
        titleKey: 'about.timelineItems.item3.title',
        descriptionKey: 'about.timelineItems.item3.description',
        companyKey: 'about.timelineItems.item3.company',
        typeKey: 'about.timelineItems.item3.type',
        taskKeys: [
            'about.timelineItems.item3.task1',
            'about.timelineItems.item3.task2',
            'about.timelineItems.item3.task3',
            'about.timelineItems.item3.task4'
        ]
    },
    {
        year: '2019', category: 'education',
        titleKey: 'about.education.dt.degree',
        descriptionKey: 'about.education.dt.field',
        schoolKey: 'about.education.dt.school',
        gradeKey: 'about.education.dt.grade',
        link: 'https://www.lgk.lu/fopro/if/',
        linkLabelKey: 'about.education.links.dt'
    },
    {
        year: '2019', category: 'work',
        titleKey: 'about.timelineItems.item4.title',
        descriptionKey: 'about.timelineItems.item4.description',
        companyKey: 'about.timelineItems.item4.company',
        typeKey: 'about.timelineItems.item4.type',
        taskKeys: [
            'about.timelineItems.item4.task1',
            'about.timelineItems.item4.task2',
            'about.timelineItems.item4.task3',
            'about.timelineItems.item4.task4',
            'about.timelineItems.item4.task5'
        ]
    },
    {
        year: '2019', category: 'work',
        titleKey: 'about.timelineItems.item5.title',
        descriptionKey: 'about.timelineItems.item5.description',
        companyKey: 'about.timelineItems.item5.company',
        typeKey: 'about.timelineItems.item5.type',
        taskKeys: [
            'about.timelineItems.item5.task1',
            'about.timelineItems.item5.task2',
            'about.timelineItems.item5.task3',
            'about.timelineItems.item5.task4',
            'about.timelineItems.item5.task5'
        ]
    },
    {
        year: '2016', category: 'work',
        titleKey: 'about.timelineItems.item6.title',
        descriptionKey: 'about.timelineItems.item6.description',
        companyKey: 'about.timelineItems.item6.company',
        typeKey: 'about.timelineItems.item6.type',
        taskKeys: [
            'about.timelineItems.item6.task1',
            'about.timelineItems.item6.task2',
            'about.timelineItems.item6.task3',
            'about.timelineItems.item6.task4',
            'about.timelineItems.item6.task5'
        ]
    }
]

export interface ExperienceItem {
    titleKey: string
    descriptionKey: string
    icon: string
    image: string
    alt: string
}

export const experienceItems: ExperienceItem[] = [
    {
        titleKey: 'about.experiencesList.exp1.title',
        descriptionKey: 'about.experiencesList.exp1.description',
        icon: 'mdi:helicopter',
        image: 'helicopter.webp',
        alt: 'Chad Feierstein helicopter flight over Dominican Republic city and Caribbean Sea'
    },
    {
        titleKey: 'about.experiencesList.exp2.title',
        descriptionKey: 'about.experiencesList.exp2.description',
        icon: 'mdi:parachute',
        image: 'skydiving.webp',
        alt: 'Chad Feierstein skydiving over Luxembourg from 4000 meters altitude'
    },
    {
        titleKey: 'about.experiencesList.exp3.title',
        descriptionKey: 'about.experiencesList.exp3.description',
        icon: 'mdi:music-note',
        image: 'tomorrowland2025.webp',
        alt: 'Chad Feierstein at Tomorrowland Belgium 2025 electronic music festival'
    }
]

export function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    return age
}
