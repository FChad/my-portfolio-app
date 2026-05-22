<script setup lang="ts">
import {
    BIRTH_DATE, calculateAge,
    profileInfoItems, certificationItems, timelineItems, experienceItems
} from '~/data/about'

const { t } = useI18n()

const currentAge = calculateAge(BIRTH_DATE)

const profileInfo = computed(() =>
    profileInfoItems.map(item => ({
        icon: item.icon,
        label: t(item.labelKey),
        value: t(item.valueKey)
    }))
)

const educationItems = computed(() =>
    timelineItems
        .filter(item => item.category === 'education')
        .map(item => ({
            year: item.year,
            title: t(item.titleKey),
            description: t(item.descriptionKey),
            school: item.schoolKey ? t(item.schoolKey) : undefined,
            grade: item.gradeKey ? t(item.gradeKey) : undefined
        }))
)

const workItems = computed(() =>
    timelineItems
        .filter(item => item.category === 'work')
        .map(item => ({
            year: item.year,
            title: t(item.titleKey),
            description: t(item.descriptionKey),
            company: item.companyKey ? t(item.companyKey) : undefined,
            type: item.typeKey ? t(item.typeKey) : undefined,
            active: item.active ?? false
        }))
)

const certifications = computed(() =>
    certificationItems.map(item => ({
        title: t(item.titleKey),
        year: item.year,
        description: t(item.descriptionKey),
        icon: item.icon
    }))
)

const experiences = computed(() =>
    experienceItems.map(item => ({
        title: t(item.titleKey),
        description: t(item.descriptionKey),
        image: item.image,
        alt: item.alt
    }))
)
</script>

<template>
    <HomeAboutProfileStory :profile-info="profileInfo" :age="currentAge" />
    <HomeAboutInterests />
    <HomeAboutEducation :items="educationItems" />
    <HomeAboutWorkTimeline :items="workItems" />
    <HomeAboutExperiences :experiences="experiences" />
    <HomeAboutCertifications :certifications="certifications" />
</template>
