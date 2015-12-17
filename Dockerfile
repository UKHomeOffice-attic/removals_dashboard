FROM quay.io/ukhomeofficedigital/nodejs:v1.0.0

RUN yum install -y yum-utils epel-release && \
    yum-config-manager --enable cr && \
    yum install -y nginx

RUN ln -s /dev/stderr /var/log/nginx/error.log && \
    ln -s /dev/stdout /var/log/nginx/access.log && \
    rm -rf /usr/share/nginx/html && \
    ln -s /app/dist /usr/share/nginx/html

COPY entry-point.sh /entry-point.sh

RUN npm run postinstall
ENTRYPOINT ["/entry-point.sh"]
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
