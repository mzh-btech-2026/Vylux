package org.example.backend.Category.Repository;

import org.example.backend.Category.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {


}
