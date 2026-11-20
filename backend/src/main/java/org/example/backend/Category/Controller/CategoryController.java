package org.example.backend.Category.Controller;


import jakarta.validation.Valid;
import org.example.backend.Category.DTO.CategoryRequest;
import org.example.backend.Category.DTO.CategoryResponse;
import org.example.backend.Category.DTO.CategoryUpdateRequest;
import org.example.backend.Category.Service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vylux/category")
@CrossOrigin("http://localhost:5173")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {

        this.categoryService = categoryService;
    }


    //---------------- create a new category ----------------------
    @PostMapping("/create")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @ModelAttribute CategoryRequest categoryRequest) {

        CategoryResponse categoryResponse = categoryService.createCategory(categoryRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(categoryResponse);
    }

    //---------------- get all category --------------------------
    @GetMapping("/getall")
    public ResponseEntity<Page<CategoryResponse>> getAllCategory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(categoryService.getAllCategory(page, size));
    }


    //---------------- update a category ----------------------
    @PatchMapping("/update/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id, @Valid @ModelAttribute CategoryUpdateRequest categoryRequest) {

        CategoryResponse categoryResponse = categoryService.updateCategory(id, categoryRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(categoryResponse);
    }

    //---------------- delete a category ----------------------
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id) {

        categoryService.deleteCategory(id);

        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully Deleted");
    }


}
