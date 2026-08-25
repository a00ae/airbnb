import React, { useState } from 'react';
import { categoriesData, type Category, type DestinationItem } from './destinationsData';
import './DestinationsSection.scss'; // استيراد ملف SCSS

export const DestinationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('popular');
  const [showAll, setShowAll] = useState<boolean>(false);

  const currentCategory = categoriesData.find((cat) => cat.key === activeTab);
  
  const displayedItems = currentCategory
    ? showAll
      ? currentCategory.items
      : currentCategory.items.slice(0, 17)
    : [];

  return (
    <section className="destinations-section">
      {/* شريط التبويبات */}
      <div className="tabs-container">
        {categoriesData.map((tab: Category) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* شبكة العناصر */}
      <div className="destinations-grid">
        {displayedItems.map((item: DestinationItem) => (
          <div key={item.id} className="destination-item">
            <span className="city-name">{item.city}</span>
            <span className="rental-type">{item.type}</span>
          </div>
        ))}

        {/* زر Show More */}
        {currentCategory && currentCategory.items.length > 17 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="show-more-btn"
          >
            <span>{showAll ? 'Show less' : 'Show more'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`arrow-icon ${showAll ? 'rotate' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default DestinationsSection;