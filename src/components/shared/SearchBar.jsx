import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Input, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce';
import axios from 'axios';

const { Search } = Input

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.trim() === '') {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product?search=${query}`
        );
        setSuggestions(response.data.productData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Update suggestions when search query changes
  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery, fetchSuggestions]);

  const handleSearch = (value) => {
    if (value) navigate(`/search?q=${value}`)
    setSuggestions([]);
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`)
    setSuggestions([])
  }

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={wrapperRef}>
      <Search
        placeholder="input search text"
        value={searchQuery}
        onSearch={value => handleSearch(value)}
        onChange={handleInputChange}
        enterButton={<button className='flex px-3 h-10 rounded-[0_0.5rem_0.5rem_0] items-center bg-orange-500 text-xl text-white'><SearchOutlined /></button>}
        size="large" />

      <div className='absolute top-10 left-0 w-full z-50'>
        {loading ? (
          <div className='p-4 bg-white rounded-md border'>Loading...</div>
        ) : (
          suggestions.length > 0 &&
          <List
            bordered
            dataSource={suggestions}
            renderItem={(item) => (
                <List.Item className='font-bold hover:bg-stone-100 cursor-pointer' onClick={() => handleSuggestionClick(item._id)}>
                  {item.name}
                </List.Item>
            )}
            style={{ width: '100%', backgroundColor: 'white', overflow: 'hidden' }}
          />
        )}
      </div>
    </div>
  )
}

export default SearchBar
