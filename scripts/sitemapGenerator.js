require("@babel/register");

const router = require("./sitemapRoutes").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
        new Sitemap(router)
            .build("https://www.sasm.co.kr")
            .save("./public/sitemap.xml") // sitemap.xml 파일이 생성될 위치입니다.
    );
}

generateSitemap();