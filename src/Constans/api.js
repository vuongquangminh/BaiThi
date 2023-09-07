const EndPoint = "http://wlp.howizbiz.com/api";
const URL = "http://wlp.howizbiz.com";
const Api = {
  login: EndPoint + "/web-authenticate",
  apiMe: EndPoint + "/me",
  logout: EndPoint + "/logout",
  logo: URL + "/static/img/favicon.e4ca0e6e.png",
  apiLoai: EndPoint + "/species",
  sach_do: EndPoint + "/danhmuccha?ma_danh_mucs[]=REDBOOK&ma_danh_mucs[]=IUCN",
  phan_loai_hoc:
    EndPoint +
    "/phanloaihoc?ranks[]=Kingdom&ranks[]=Phylum&ranks[]=Class&ranks[]=Order&ranks[]=",
  red_book: EndPoint + "/danhmuccha?ma_danh_mucs[]=REDBOOK",
  iucn: EndPoint + "/danhmuccha?ma_danh_mucs[]=IUCN",
  kingdom: EndPoint + "/phanloaihoc?ranks[]=Kingdom",
  phylum: EndPoint + "/phanloaihoc?ranks[]=Phylum",
  CLASS: EndPoint + "/phanloaihoc?ranks[]=Class",
  order: EndPoint + "/phanloaihoc?ranks[]=Order",
  family: EndPoint + "/phanloaihoc?ranks[]=Family",
  genus: EndPoint + "/phanloaihoc?ranks[]=Genus",
};

const YEARS = [
    {nam:'2022'},
    {nam:'2021'},
    {nam:'2020'},
    {nam:'2019'},
    {nam:'2018'},
    {nam:'2017'},
    {nam:'2016'},
    {nam:'2015'},
    {nam:'2014'},
    {nam:'2013'},
    {nam:'2012'},
    {nam:'2011'},
    {nam:'2010'},
    {nam:'2009'},
    {nam:'2008'},
    {nam:'2007'},
    {nam:'2006'},
    {nam:'2005'},
    {nam:'2004'},
    {nam:'2003'},
    {nam:'2002'},
    {nam:'2001'},
    {nam:'2000'},
    {nam:'1999'},
    {nam:'1998'},
    {nam:'1997'},
  ]
  
  export {EndPoint,URL,YEARS}
  export default Api;