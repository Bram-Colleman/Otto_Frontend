<script setup>
</script>

<template>
    <RouterLink to="/">Back</RouterLink>
    <h1>Register</h1>
    <form @submit.prevent="">
        <label for="givenName">Voornaam</label>
        <input type="text" name="givenName">
        <label for="familyName">Achternaam</label>
        <input type="text" name="familyName">
        <label for="dateOfBirth">Geboortedatum</label>
        <input type="date" name="dateOfBirth">
        <label for="gender">Geslacht</label>
        <div>
            <input type="radio" name="gender" value="M" id="male"> <label for="male">Man</label>
        </div>
        <div>
            <input type="radio" name="gender" value="F" id="female"> <label for="female">Vrouw</label>
        </div>
        <div>
            <input type="radio" name="gender" value="X" id="other"> <label for="other">Anders</label>
        </div>
        <label for="password">Wachtwoord</label>
        <input type="password" name="password">
        <input type="password" name="password">
        <label for="email">e-mail</label>
        <input type="email" name="email">
        <input type="submit" name="">
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 15rem;
}
</style>
