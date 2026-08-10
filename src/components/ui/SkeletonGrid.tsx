import React from 'react';
import './SkeletonGrid.css';

export default function SkeletonGrid() {
  return (
    <section className="ssc-02 w-full flex justify-center py-12 bg-transparent" aria-label="Loading products...">
      <div className="ssc-02__grid w-full" role="status" aria-busy="true">
        <span className="ssc-sr">Loading trips…</span>
        
        {/* Render 3 cards to match the user's design */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="ssc-02__card" aria-hidden="true">
            <div className="ssc-sk ssc-02__img"></div>
            <div className="ssc-sk ssc-02__title"></div>
            <div className="ssc-sk ssc-02__price"></div>
            <div className="ssc-sk ssc-02__btn"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
