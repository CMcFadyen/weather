import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSun, faMoon, faCloudSun, faCloudMoon, faCloud, faCloudSunRain, faCloudMoonRain, faCloudShowersHeavy, faBoltLightning, faSnowflake, faWater } from '@fortawesome/free-solid-svg-icons';

export const IconLookup: Record<string, IconDefinition> = {
	'01d': faSun,
	'01n': faMoon,
	'02d': faCloudSun,
	'02n': faCloudMoon,
	'03d': faCloud,
	'03n': faCloud,
	'04d': faCloud,
	'04n': faCloud,
	'09d': faCloudSunRain,
	'09n': faCloudMoonRain,
	'10d': faCloudShowersHeavy,
	'10n': faCloudShowersHeavy,
	'11d': faBoltLightning,
	'11n': faBoltLightning,
	'13d': faSnowflake,
	'13n': faSnowflake,
	'50d': faWater,
	'50n': faWater,
};