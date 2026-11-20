package org.example.backend.Banner.Service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.example.backend.Banner.DTO.BannerRequest;
import org.example.backend.Banner.DTO.BannerResponse;
import org.example.backend.Banner.DTO.BannerUpdateRequest;
import org.example.backend.Banner.Entity.Banner;
import org.example.backend.Banner.Repository.BannerRepository;
import org.example.backend.Config.CloudinaryConfig;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BannerService {

    private final BannerRepository bannerRepository;
    private final Cloudinary cloudinary;

    public BannerService(BannerRepository bannerRepository,Cloudinary cloudinary){

        this.bannerRepository=bannerRepository;
        this.cloudinary=cloudinary;

    }



    // -------------- response mapper --------------------

    public BannerResponse maptoresponse(Banner banner){

        BannerResponse bannerResponse = new BannerResponse();

        bannerResponse.setId(banner.getId());
        bannerResponse.setBannerName(banner.getBannerName());
        bannerResponse.setBannerImage(banner.getBannerImage());
        bannerResponse.setUrl(banner.getUrl());
        bannerResponse.setStatus(banner.getStatus());
        bannerResponse.setCreatedAt(banner.getCreatedAt());
        bannerResponse.setUpdatedAt(banner.getUpdatedAt());

        return bannerResponse;
    }

    // ----------------- create a new banner -----------------

    public BannerResponse createBanner(BannerRequest bannerRequest) {

        try {

            MultipartFile image = bannerRequest.getBannerImage();

            if (image == null || image.isEmpty()) {
                throw new RuntimeException("Banner image is required");
            }

            // Declare variables outside inner try
            String imageUrl;
            String publicId;

            try {

                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.emptyMap()
                );

                imageUrl = (String) uploadResult.get("secure_url");
                publicId = (String) uploadResult.get("public_id");

            } catch (IOException e) {

                throw new RuntimeException("Failed to upload banner image", e);

            }

            // Create entity
            Banner banner = new Banner();

            banner.setBannerName(bannerRequest.getBannerName());
            banner.setUrl(bannerRequest.getUrl());
            banner.setStatus(bannerRequest.getStatus());

            banner.setBannerImage(imageUrl);
            banner.setPublicId(publicId);

            // Save in database
            Banner savedBanner = bannerRepository.save(banner);

            // Return response
            return maptoresponse(savedBanner);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to create banner: " + e.getMessage(), e
            );
        }
    }


    // ----------- get all banners ---------------
    public List<BannerResponse> getAllBanners(){

        return bannerRepository.findAll().stream().map(
                this::maptoresponse
        ).collect(Collectors.toList());
    }



    // ----------------- Delete banner by ID ------------------------

    // ----------------- Delete banner by ID ------------------------

    public void deleteBanner(Long id) {

        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "The given banner ID was not found"
                        )
                );

        try {

            // Delete image from Cloudinary
            Map result = cloudinary.uploader().destroy(
                    banner.getPublicId(),
                    ObjectUtils.emptyMap()
            );

            System.out.println("Cloudinary delete result: " + result);

            // Delete banner from PostgreSQL
            bannerRepository.delete(banner);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to delete image from Cloudinary", e
            );
        }
    }


    //--------------- update the banner ------------------

    public BannerResponse updateBanner(Long id, BannerUpdateRequest bannerRequest) {

        // 1. Find existing banner
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "The given banner ID was not found"
                        )
                );

        // 2. Update normal fields
        banner.setBannerName(bannerRequest.getBannerName());
        banner.setUrl(bannerRequest.getUrl());
        banner.setStatus(bannerRequest.getStatus());

        // 3. Check whether a new image was uploaded
        MultipartFile image = bannerRequest.getBannerImage();

        if (image != null && !image.isEmpty()) {

            try {

                // Delete old image from Cloudinary
                if (banner.getPublicId() != null) {

                    cloudinary.uploader().destroy(
                            banner.getPublicId(),
                            ObjectUtils.emptyMap()
                    );
                }

                // Upload new image
                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.asMap(
                                "folder", "banner"
                        )
                );

                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");

                // Update image details
                banner.setBannerImage(imageUrl);
                banner.setPublicId(publicId);

            } catch (IOException e) {

                throw new RuntimeException(
                        "Failed to update banner image", e
                );
            }
        }

        // 4. Save updated banner
        Banner updatedBanner = bannerRepository.save(banner);

        // 5. Return response
        return maptoresponse(updatedBanner);
    }




}
