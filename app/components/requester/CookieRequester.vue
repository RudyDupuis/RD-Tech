<script setup lang="ts">
const { initialize } = useGtag();

const hasConsent = ref<boolean>(false);
const askForConsent = ref<boolean>(false);

function enableAnalytics() {
  if (!hasConsent.value) return;
  initialize();
}

const acceptCookies = () => {
  localStorage.setItem("cookieConsent", "accepted");
  enableAnalytics();
  askForConsent.value = false;
};

const refuseCookies = () => {
  localStorage.setItem("cookieConsent", "refused");
  askForConsent.value = false;
};

onMounted(() => {
  askForConsent.value = isNull(localStorage.getItem("cookieConsent"));
  if (!askForConsent.value) {
    hasConsent.value = localStorage.getItem("cookieConsent") === "accepted";
  }
  enableAnalytics();
});
</script>

<template>
  <Snackbar
    v-if="askForConsent"
    type="info"
    message="Des cookies sont utilisés par Google Analitycs pour mesurer le trafic."
    :buttons="[
      { title: 'Accepter', action: acceptCookies },
      { title: 'Refuser', action: refuseCookies }
    ]"
  />
</template>
