import config from "../config.js";

const mapper = listing => {
    const baseUrl = config.ASSET_BASE_URL;
    const mapImage = image => ({
        url: `${baseUrl}${image.fileName}_full.jpg`,
        thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`
    });

    return {
        ...listing,
        images: listing.images.map(mapImage)
    };
};

export default mapper;