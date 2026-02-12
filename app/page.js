'use client';

import { useMemo, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: '코튼 반팔 티셔츠', price: 19000, category: '상의' },
  { id: 2, name: '슬림 데님 팬츠', price: 39000, category: '하의' },
  { id: 3, name: '미니멀 볼캡', price: 22000, category: '잡화' },
  { id: 4, name: '오버핏 후드 집업', price: 49000, category: '아우터' },
  { id: 5, name: '베이직 스니커즈', price: 59000, category: '신발' },
  { id: 6, name: '나일론 숄더백', price: 32000, category: '잡화' }
];

const CATEGORIES = ['전체', '상의', '하의', '아우터', '신발', '잡화'];

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesKeyword = product.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory =
        selectedCategory === '전체' || product.category === selectedCategory;

      return matchesKeyword && matchesCategory;
    });
  }, [keyword, selectedCategory]);

  return (
    <main className="mobile-page">
      <header className="top-controls">
        <input
          type="search"
          className="search-input"
          placeholder="상품명 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button
          type="button"
          className="filter-button"
          onClick={() => setIsFilterOpen(true)}
        >
          필터
        </button>
      </header>

      <section className="product-list" aria-label="상품 리스트">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <p className="category">{product.category}</p>
              <h2>{product.name}</h2>
              <p className="price">{product.price.toLocaleString()}원</p>
            </article>
          ))
        ) : (
          <p className="empty">조건에 맞는 상품이 없습니다.</p>
        )}
      </section>

      <div
        className={`overlay ${isFilterOpen ? 'show' : ''}`}
        onClick={() => setIsFilterOpen(false)}
        aria-hidden="true"
      />

      <aside className={`filter-panel ${isFilterOpen ? 'open' : ''}`} aria-label="필터 옵션">
        <div className="panel-head">
          <h3>카테고리 선택</h3>
          <button type="button" onClick={() => setIsFilterOpen(false)}>
            닫기
          </button>
        </div>

        <div className="category-group">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => {
                setSelectedCategory(category);
                setIsFilterOpen(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </aside>
    </main>
  );
}
