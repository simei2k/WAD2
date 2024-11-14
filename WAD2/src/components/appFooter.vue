<template>
    <div class="page-container">
        <!-- Main content container -->
        <div class="content">
            <!-- Your main content goes here -->
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <!-- Social Links with Horizontal Lines -->
                <div class="social-links-container">
                    <span class="line"></span>
                    <ul class="social-links">
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                aria-label="Twitter"
                            >
                                <img src="../assets/x.png" alt="Twitter Logo" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                            >
                                <img
                                    src="../assets/instagram.png"
                                    alt="Instagram Logo"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                aria-label="Facebook"
                            >
                                <img
                                    src="../assets/facebook.png"
                                    alt="Facebook Logo"
                                />
                            </a>
                        </li>
                    </ul>
                    <span class="line"></span>
                </div>
                <!-- Copyright -->
                <p>&copy; 2024 PawPal. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'AppFooter',
};
</script>

<style scoped>
/* Footer stay near to bottom no matter what */
.page-container {
    display: flex;
    flex-direction: column;
    /* min-height: 60vh; */
}

.content {
    flex: 1;
}

/* Footer Styling */
.footer {
    background-color: #1d1d1d;
    color: rgb(139, 5, 5);
    text-align: center;
    padding: 20px 0;
    width: 100%;
    box-shadow: inset 0 -2em 4em rgb(0, 0, 0),
        0 0 5px 3px rgba(255, 255, 255, 0.1),
        0 4px 40px rgb(68, 68, 72);
}

.container {
    padding: 0 12px 10px;
}

/* Social Links Container with Lines */
.social-links-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}

.line {
    flex: 1;
    height: 1px;
    background-color: #ddd;
    margin: 0 15px;
    align-self: center;
}

.social-links {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.social-links li {
    margin: 0 15px;
}

.social-links img {
    width: 35px;
    height: auto;
}

.footer p {
    font-size: 0.9rem;
    color: #888;
    margin-top: 10px;
}
</style>
