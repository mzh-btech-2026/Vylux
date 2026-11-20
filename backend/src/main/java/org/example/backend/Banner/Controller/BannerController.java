
package org.example.backend.Banner.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.example.backend.Banner.DTO.BannerRequest;
import org.example.backend.Banner.DTO.BannerResponse;
import org.example.backend.Banner.DTO.BannerUpdateRequest;
import org.example.backend.Banner.Service.BannerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/vylux/banner")
public class BannerController {

    private final BannerService bannerService;

    public BannerController(BannerService bannerService){
        this.bannerService=bannerService;
    }


//    ------------- create a new Banner -------------------
    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE )

    public ResponseEntity<BannerResponse> createBanner(

            @Valid @ModelAttribute BannerRequest bannerRequest){

        BannerResponse bannerResponse = bannerService.createBanner(bannerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(bannerResponse);

    }


    //------------------- get all banners --------------
    @GetMapping("/all")
    public ResponseEntity<List<BannerResponse>> getAllBanners(){

        List<BannerResponse> banners = bannerService.getAllBanners();
        return ResponseEntity.status(HttpStatus.OK).body(banners);
    }

    //--------------- delete a banner by id -------------------
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){

        bannerService.deleteBanner(id);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted");
    }

    //--------------- delete a banner by id -------------------
    @PatchMapping("/update/{id}")
    public ResponseEntity<BannerResponse> updateBanner(@PathVariable Long id, @Valid @ModelAttribute BannerUpdateRequest bannerRequest){

        BannerResponse bannerResponse = bannerService.updateBanner(id,bannerRequest);
        return ResponseEntity.status(HttpStatus.OK).body(bannerResponse);
    }


}
