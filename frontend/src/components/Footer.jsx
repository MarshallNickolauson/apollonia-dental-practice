function Footer() {
    const currentDate = new Date().getFullYear();
    return (
        <footer className='flex justify-center'>
            Apollonia Dental Practice &copy; {currentDate}
        </footer>
    );
}

export default Footer;
