import time

# Dictionary to store cached data along with expiry time
cache = {}

def set_cache(key: str, value, ttl: int = 300):
    """
    Store a value in the cache with a time-to-live (TTL).
    The cache entry will expire after 'ttl' seconds.
    """
    expiry_time = time.time() + ttl  # Current time + TTL
    cache[key] = {"value": value, "expiry": expiry_time}

def get_cache(key: str):
    """
    Retrieve a value from the cache.
    If the entry has expired, it will be removed, and None will be returned.
    """
    cached_entry = cache.get(key)

    if not cached_entry:
        return None  # Key not found

    # Check if the cached value has expired
    if time.time() > cached_entry["expiry"]:
        del cache[key]  # Remove expired entry
        return None  # Expired, return None

    return cached_entry["value"]  # Return valid cached value
