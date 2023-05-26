#!/usr/bin/env sh

set -e

if [ "$1" = 'start-service.sh' ]; then
	for f in /docker-entrypoint.d/*; do
		case "$f" in
		*.sh)
			echo "$0: running $f"
			. "$f"
			;;
		*) echo "$0: ignoring $f" ;;
		esac
		echo
	done
fi

exec "$@"
