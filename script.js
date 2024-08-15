document.getElementById('birthdate').addEventListener('change', function() {
    const birthdate = new Date(this.value);
    if (birthdate > new Date()) return alert("Geburtsdatum kann nicht in der Zukunft liegen!");

    // Einmalige Berechnung der statischen Werte (Jahre, Monate, Wochen, Tage, Stunden)
    function calculateStaticTime() {
        const now = new Date();
        const diff = now - birthdate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const remainingMonths = (diff % (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor(remainingMonths / (1000 * 60 * 60 * 24 * 30.44));
        const remainingDays = (remainingMonths % (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor(remainingDays / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const remainingHours = (remainingDays % (1000 * 60 * 60 * 24));
        const hours = Math.floor(remainingHours / (1000 * 60 * 60));
        const totalMinutes = Math.floor(diff / (1000 * 60));
        const totalSeconds = Math.floor(diff / 1000);

        // Statische Umrechnung der Gesamtdauer in die verschiedenen Einheiten
        document.getElementById('totalYears').textContent = years.toLocaleString() + ' Jahre' ;
        document.getElementById('totalMonths').textContent = (years * 12 + months).toLocaleString() + ' Monate';
        document.getElementById('totalWeeks').textContent = Math.floor(diff / (1000 * 60 * 60 * 24 * 7)).toLocaleString() + ' Wochen';
        document.getElementById('totalDays').textContent = Math.floor(diff / (1000 * 60 * 60 * 24)).toLocaleString() + ' Tage';
        document.getElementById('totalHours').textContent = Math.floor(diff / (1000 * 60 * 60)).toLocaleString() + ' Stunden';
        document.getElementById('totalMinutes').textContent = totalMinutes.toLocaleString() + ' Minuten';
        document.getElementById('totalSeconds').textContent = totalSeconds.toLocaleString() + ' Sekunden';

        // Zeige initiale Zeit an
        document.getElementById('liveTime').textContent = `${years} Jahre, ${months} Monate, ${weeks} Wochen, ${days} Tage, ${hours} Stunden, ${totalMinutes % 60} Minuten, ${totalSeconds % 60} Sekunden`;

        return { minutes: totalMinutes % 60, seconds: totalSeconds % 60 }; // Initiale Werte
    }

    // Aktualisierung nur der Minuten und Sekunden
    function updateMinutesAndSeconds(lastValues) {
        const now = new Date();
        const diff = now - birthdate;

        const totalMinutes = Math.floor(diff / (1000 * 60));
        const totalSeconds = Math.floor(diff / 1000);

        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        // Nur Minuten und Sekunden in der Live-Anzeige aktualisieren
        if (lastValues.minutes !== minutes || lastValues.seconds !== seconds) {
            document.getElementById('liveTime').textContent = document.getElementById('liveTime').textContent.replace(
                `${lastValues.minutes} Minuten, ${lastValues.seconds} Sekunden`,
                `${minutes} Minuten, ${seconds} Sekunden`
            );

            lastValues.minutes = minutes;
            lastValues.seconds = seconds;
        }
    }

    const lastValues = calculateStaticTime(); // Initiale Berechnung der statischen Werte
    setInterval(() => updateMinutesAndSeconds(lastValues), 1000); // Aktualisiere nur Minuten und Sekunden
});
